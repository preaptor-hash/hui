'use server';

import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function createRefundRequest(data: {
  orderId: string;
  customerId: string;
  reason: string;
  type: string; // 'full' or 'partial'
  items: { productId: string; quantity: number; reason: string }[];
  evidenceFiles?: File[];
}) {
  const supabase = await createClient();

  // Validate Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', data.orderId)
    .single();

  if (orderError || !order) throw new Error('Order not found or invalid');

  // Generate Refund Number
  const year = new Date().getFullYear();
  const sequence = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const refundNumber = `REF-${year}-${sequence}`;

  // Insert Refund Record
  const { data: refund, error: refundError } = await supabase
    .from('refunds')
    .insert({
      order_id: data.orderId,
      customer_id: data.customerId,
      refund_number: refundNumber,
      refund_type: data.type,
      refund_reason: data.reason,
      refund_status: 'pending',
    })
    .select()
    .single();

  if (refundError || !refund) throw new Error('Failed to create refund request');

  // Insert Refund Items
  const refundItems = data.items.map(item => ({
    refund_id: refund.id,
    product_id: item.productId,
    quantity: item.quantity,
    reason: item.reason,
    item_status: 'pending_inspection'
  }));

  const { error: itemsError } = await supabase.from('refund_items').insert(refundItems);
  if (itemsError) throw new Error('Failed to insert refund items');

  // Upload Evidence if provided
  if (data.evidenceFiles && data.evidenceFiles.length > 0) {
    for (let i = 0; i < data.evidenceFiles.length; i++) {
      const file = data.evidenceFiles[i];
      const fileExt = file.name.split('.').pop();
      const filePath = `${data.customerId}/${refund.id}/${uuidv4()}.${fileExt}`;
      
      const arrayBuffer = await file.arrayBuffer();
      await supabase.storage
        .from('refund-evidence')
        .upload(filePath, arrayBuffer, {
          contentType: file.type
        });
    }
  }

  return refund;
}

export async function getCustomerRefunds(customerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('refunds')
    .select('*, refund_items(*, product:products(*))')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllRefunds() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('refunds')
    .select('*, profiles:customer_id(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateRefundStatus(refundId: string, status: string, adminNotes?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('refunds')
    .update({ 
      refund_status: status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString()
    })
    .eq('id', refundId)
    .select()
    .single();

  if (error) throw error;

  // If approved and it's a full refund, you might call payment gateway here
  // e.g., if (status === 'approved') { await processStripeRefund(data.order_id); }

  return data;
}

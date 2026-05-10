'use server';

import { createClient } from '@/lib/supabase/server';
import { generateInvoicePDF, InvoiceData } from '@/lib/pdf/invoice-generator';
import { v4 as uuidv4 } from 'uuid';

export async function createInvoice(orderId: string, customerId: string) {
  const supabase = await createClient();
  
  // Fetch order details
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(*))')
    .eq('id', orderId)
    .single();

  if (orderError || !order) throw new Error('Order not found');

  // Generate unique invoice number: INV-YEAR-XXXXXX
  const year = new Date().getFullYear();
  const sequence = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const invoiceNumber = `INV-${year}-${sequence}`;

  // Process items and calculate taxes (assuming 18% GST default for simplicity if not set)
  let subtotal = 0;
  let taxAmount = 0;
  const items = order.order_items.map((item: Record<string, any>) => {
    const unitPrice = item.price;
    const qty = item.quantity;
    const taxPercentage = item.product.tax_rate || 18; // Default 18% GST
    
    const itemSubtotal = unitPrice * qty;
    const itemTax = itemSubtotal * (taxPercentage / 100);
    const itemTotal = itemSubtotal + itemTax;

    subtotal += itemSubtotal;
    taxAmount += itemTax;

    return {
      product_id: item.product_id,
      product_name: item.product.name,
      quantity: qty,
      unit_price: unitPrice,
      tax_percentage: taxPercentage,
      total_amount: itemTotal
    };
  });

  const shippingAmount = order.shipping_cost || 0;
  const discountAmount = order.discount || 0;
  const grandTotal = subtotal + taxAmount + shippingAmount - discountAmount;

  // Insert Invoice Record
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      order_id: orderId,
      customer_id: customerId,
      invoice_number: invoiceNumber,
      subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      discount_amount: discountAmount,
      grand_total: grandTotal,
      currency: 'INR',
      billing_address: order.billing_address,
      shipping_address: order.shipping_address,
      gst_number: order.gst_number || null,
      payment_status: 'paid', // Assuming payment is done
    })
    .select()
    .single();

  if (invoiceError || !invoice) throw new Error('Failed to create invoice record');

  // Insert Invoice Items
  const invoiceItemsToInsert = items.map((item: Record<string, any>) => ({
    invoice_id: invoice.id,
    ...item
  }));

  const { error: itemsError } = await supabase.from('invoice_items').insert(invoiceItemsToInsert);
  if (itemsError) throw new Error('Failed to insert invoice items');

  // Generate PDF
  const invoiceData: InvoiceData = {
    invoice_number: invoiceNumber,
    order_id: orderId,
    issued_at: new Date().toISOString(),
    billing_address: order.billing_address,
    shipping_address: order.shipping_address,
    subtotal,
    tax_amount: taxAmount,
    shipping_amount: shippingAmount,
    discount_amount: discountAmount,
    grand_total: grandTotal,
    currency: 'INR',
    items: items.map((item: Record<string, any>) => ({
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      tax_percentage: item.tax_percentage,
      total_amount: item.total_amount
    }))
  };

  const pdfBuffer = await generateInvoicePDF(invoiceData);

  // Upload PDF to Supabase Storage
  const filePath = `${customerId}/${invoiceNumber}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from('invoice-pdfs')
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    });

  if (uploadError) throw new Error('Failed to upload PDF');

  // Update Invoice with PDF URL
  const { data: publicUrlData } = supabase.storage.from('invoice-pdfs').getPublicUrl(filePath); // Actually bucket is private, we should use createSignedUrl later when downloading

  await supabase
    .from('invoices')
    .update({ pdf_url: filePath })
    .eq('id', invoice.id);

  return invoice;
}

export async function getInvoiceDownloadUrl(filePath: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from('invoice-pdfs')
    .createSignedUrl(filePath, 60 * 60); // 1 hour

  if (error || !data) throw new Error('Failed to generate download URL');
  return data.signedUrl;
}

export async function getCustomerInvoices(customerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllInvoices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invoices')
    .select('*, profiles:customer_id(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

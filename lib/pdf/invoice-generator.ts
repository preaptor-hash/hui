import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface InvoiceItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  tax_percentage: number;
  total_amount: number;
}

export interface InvoiceData {
  invoice_number: string;
  order_id: string;
  issued_at: string;
  billing_address: Record<string, any>;
  shipping_address: Record<string, any>;
  customer_email?: string;
  customer_phone?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  grand_total: number;
  currency: string;
  payment_method?: string;
  transaction_id?: string;
  items: InvoiceItem[];
}

export const generateInvoicePDF = async (data: InvoiceData): Promise<Buffer> => {
  const doc = new jsPDF();
  
  // Company Details
  doc.setFontSize(20);
  doc.text('INVOICE', 14, 22);
  
  doc.setFontSize(10);
  doc.text('Indica Luxe Enterprise', 14, 30);
  doc.text('Global Headquarters, Industrial Park', 14, 35);
  doc.text('GSTIN: 29AAACL1234F1Z5', 14, 40);
  doc.text('billing@indicaluxe.com', 14, 45);

  // Invoice Details
  doc.text(`Invoice No: ${data.invoice_number}`, 140, 30);
  doc.text(`Date: ${format(new Date(data.issued_at), 'dd MMM yyyy')}`, 140, 35);
  doc.text(`Order ID: ${data.order_id}`, 140, 40);

  // Billing and Shipping
  doc.text('Bill To:', 14, 60);
  doc.text(data.billing_address?.name || 'Customer Name', 14, 65);
  doc.text(data.billing_address?.street || '', 14, 70);
  doc.text(`${data.billing_address?.city || ''}, ${data.billing_address?.state || ''}`, 14, 75);
  if (data.customer_email) doc.text(data.customer_email, 14, 80);

  doc.text('Ship To:', 100, 60);
  doc.text(data.shipping_address?.name || 'Customer Name', 100, 65);
  doc.text(data.shipping_address?.street || '', 100, 70);
  doc.text(`${data.shipping_address?.city || ''}, ${data.shipping_address?.state || ''}`, 100, 75);

  // Items Table
  const tableColumn = ["Product", "Qty", "Price", "Tax", "Total"];
  const tableRows = data.items.map(item => [
    item.product_name,
    item.quantity.toString(),
    `${data.currency} ${item.unit_price.toFixed(2)}`,
    `${item.tax_percentage}%`,
    `${data.currency} ${item.total_amount.toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 90,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241] } // Indigo color to match frontend
  });

  const finalY = (doc as any).lastAutoTable.finalY || 90;

  // Financial Summary
  doc.text(`Subtotal: ${data.currency} ${data.subtotal.toFixed(2)}`, 140, finalY + 10);
  doc.text(`Tax: ${data.currency} ${data.tax_amount.toFixed(2)}`, 140, finalY + 15);
  if (data.shipping_amount > 0) doc.text(`Shipping: ${data.currency} ${data.shipping_amount.toFixed(2)}`, 140, finalY + 20);
  if (data.discount_amount > 0) doc.text(`Discount: -${data.currency} ${data.discount_amount.toFixed(2)}`, 140, finalY + 25);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Grand Total: ${data.currency} ${data.grand_total.toFixed(2)}`, 140, finalY + 35);
  doc.setFont('helvetica', 'normal');

  // Footer
  doc.text('Thank you for your business!', 14, 280);
  doc.text('Terms & Conditions Apply.', 14, 285);

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
};

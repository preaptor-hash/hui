-- INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES profiles(id), -- Assuming profiles table for users
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  tax_amount NUMERIC(12,2) NOT NULL,
  shipping_amount NUMERIC(12,2) DEFAULT 0,
  discount_amount NUMERIC(12,2) DEFAULT 0,
  grand_total NUMERIC(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_status VARCHAR(20) DEFAULT 'paid',
  invoice_status VARCHAR(20) DEFAULT 'generated',
  pdf_url TEXT,
  gst_number VARCHAR(50),
  billing_address JSONB,
  shipping_address JSONB,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INVOICE ITEMS TABLE
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  tax_percentage NUMERIC(5,2),
  total_amount NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REFUNDS TABLE
CREATE TABLE IF NOT EXISTS refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES profiles(id),
  refund_number VARCHAR(50) UNIQUE NOT NULL,
  refund_type VARCHAR(30),
  refund_reason TEXT,
  refund_amount NUMERIC(12,2),
  refund_status VARCHAR(30) DEFAULT 'pending',
  payment_method VARCHAR(30),
  admin_notes TEXT,
  approved_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REFUND ITEMS TABLE
CREATE TABLE IF NOT EXISTS refund_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  refund_id UUID REFERENCES refunds(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER,
  reason TEXT,
  item_status VARCHAR(30),
  inspection_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SETUP STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('invoice-pdfs', 'invoice-pdfs', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('refund-evidence', 'refund-evidence', false) ON CONFLICT DO NOTHING;

-- RLS POLICIES FOR INVOICE PDFS
CREATE POLICY "Users Access Own Invoices" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'invoice-pdfs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins have full access to invoices" ON storage.objects
FOR ALL TO authenticated
USING (
  bucket_id = 'invoice-pdfs'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- RLS POLICIES FOR REFUND EVIDENCE
CREATE POLICY "Users Access Own Evidence" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'refund-evidence'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own evidence" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'refund-evidence'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins have full access to evidence" ON storage.objects
FOR ALL TO authenticated
USING (
  bucket_id = 'refund-evidence'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- RLS for invoices table
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own invoices" ON invoices
FOR SELECT TO authenticated
USING (customer_id = auth.uid());

CREATE POLICY "Admins can view all invoices" ON invoices
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS for invoice_items
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own invoice items" ON invoice_items
FOR SELECT TO authenticated
USING (invoice_id IN (SELECT id FROM invoices WHERE customer_id = auth.uid()));

CREATE POLICY "Admins can view all invoice items" ON invoice_items
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS for refunds
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own refunds" ON refunds
FOR SELECT TO authenticated
USING (customer_id = auth.uid());

CREATE POLICY "Users can insert their own refunds" ON refunds
FOR INSERT TO authenticated
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Admins have full access to refunds" ON refunds
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS for refund_items
ALTER TABLE refund_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own refund items" ON refund_items
FOR SELECT TO authenticated
USING (refund_id IN (SELECT id FROM refunds WHERE customer_id = auth.uid()));

CREATE POLICY "Users can insert their own refund items" ON refund_items
FOR INSERT TO authenticated
WITH CHECK (refund_id IN (SELECT id FROM refunds WHERE customer_id = auth.uid()));

CREATE POLICY "Admins have full access to refund items" ON refund_items
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

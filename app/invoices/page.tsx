import { Metadata } from 'next';
import InvoicesClient from './InvoicesClient';

export const metadata: Metadata = {
  title: 'My Invoices | Your Store',
};

export default function CustomerInvoicesPage() {
  return <InvoicesClient />;
}

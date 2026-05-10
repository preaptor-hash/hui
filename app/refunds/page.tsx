import { Metadata } from 'next';
import RefundsClient from './RefundsClient';

export const metadata: Metadata = {
  title: 'My Refunds | Your Store',
};

export default function CustomerRefundsPage() {
  return <RefundsClient />;
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle, XCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '@/constants/products';
import styles from './Orders.module.css';

const OrdersPage = () => {
  const [filter, setFilter] = useState('All');

  const orders = [
    {
      id: 'ORD-90210-LX',
      date: 'May 08, 2026',
      total: '₹45,999',
      status: 'In Transit',
      statusType: 'transit',
      items: [
        { ...products[0], quantity: 1 }
      ]
    },
    {
      id: 'ORD-88721-LX',
      date: 'May 03, 2026',
      total: '₹12,500',
      status: 'Delivered',
      statusType: 'delivered',
      items: [
        { ...products[3], quantity: 1 }
      ]
    },
    {
      id: 'ORD-87612-LX',
      date: 'April 28, 2026',
      total: '₹22,000',
      status: 'Delivered',
      statusType: 'delivered',
      items: [
        { ...products[4], quantity: 1 }
      ]
    }
  ];

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.subtitle}>Track, manage and view your luxury acquisition history.</p>
      </header>

      <div className={styles.filters}>
        {['All', 'In Transit', 'Delivered', 'Cancelled'].map(f => (
          <button 
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.ordersList}>
        {filteredOrders.map((order, idx) => (
          <motion.div 
            key={order.id}
            className={styles.orderCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.orderHead}>
              <div className={styles.orderMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Order Placed</span>
                  <span className={styles.metaValue}>{order.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Total Amount</span>
                  <span className={styles.metaValue}>{order.total}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Order ID</span>
                  <span className={styles.metaValue}>{order.id}</span>
                </div>
              </div>
              
              <div className={`${styles.statusBadge} ${styles['status' + order.statusType.charAt(0).toUpperCase() + order.statusType.slice(1)]}`}>
                {order.statusType === 'transit' && <Truck size={14} />}
                {order.statusType === 'delivered' && <CheckCircle size={14} />}
                {order.statusType === 'cancelled' && <XCircle size={14} />}
                <span>{order.status}</span>
              </div>
            </div>

            <div className={styles.orderBody}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.itemRow}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <Link href={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                    <p className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>
                    <p className={styles.subtitle}>Quantity: {item.quantity}</p>
                  </div>
                  <Link href={`/product/${item.id}`} className={styles.actionBtn}>
                    <ExternalLink size={16} />
                  </Link>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>Return Item</button>
              <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>Get Invoice</button>
              <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                {order.statusType === 'transit' ? 'Track Order' : 'Buy it Again'}
              </button>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <Package size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.3 }} />
            <p>No orders found for this selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

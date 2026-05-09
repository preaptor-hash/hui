"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Calendar, ShoppingBag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './OrderSuccess.module.css';

const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        {/* Success Hero */}
        <div className={styles.hero}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className={styles.iconWrapper}
          >
            <CheckCircle size={80} color="#38ef7d" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.title}
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.subtitle}
          >
            Thank you for your purchase. Your order ID is <strong>{orderId}</strong>. We've sent a confirmation email to your registered address.
          </motion.p>
        </div>

        {/* Order Info Cards */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Package size={20} />
              <h3>Delivery Details</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoItem}>
                <Calendar size={16} />
                <span>Estimated Delivery: <strong>May 15, 2026</strong></span>
              </div>
              <div className={styles.infoItem}>
                <Truck size={16} />
                <span>Shipping via <strong>Premium Express</strong></span>
              </div>
              <div className={styles.address}>
                <strong>Shipping To:</strong>
                <p>John Doe</p>
                <p>123 Luxury Lane, Fashion City, Mumbai - 400001</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <ShoppingBag size={20} />
              <h3>Order Summary</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.summaryItem}>
                <span>Luxury Chronograph Watch x 1</span>
                <span>₹15,999</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Shipping</span>
                <span className={styles.free}>FREE</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.totalRow}>
                <span>Total Amount Paid</span>
                <span>₹18,879</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/account/orders" className={styles.primaryBtn}>Track Your Order</Link>
          <Link href="/shop" className={styles.secondaryBtn}>Continue Shopping</Link>
        </div>

        <div className={styles.share}>
          <p>Loved your experience? Share it with your friends!</p>
          <div className={styles.shareBtns}>
            <button className={styles.shareBtn}><Share2 size={16} /> Share Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

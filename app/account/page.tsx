"use client";

import React, { useEffect } from 'react';
import { ShoppingBag, Heart, Wallet, Star, ArrowRight, Package, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './Account.module.css';
import { useAuth } from '@/lib/AuthContext';

const AccountOverview = () => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const stats = [
    { name: 'Active Orders', value: '02', icon: <ShoppingBag size={22} />, color: '#6366f1' },
    { name: 'My Wishlist', value: '18', icon: <Heart size={22} />, color: '#f43f5e' },
    { name: 'Luxe Credits', value: '₹12,450', icon: <Wallet size={22} />, color: '#f59e0b' },
    { name: 'Reward Tier', value: 'Gold', icon: <Star size={22} />, color: '#10b981' },
  ];

  const recentOrders = [
    { id: 'LX-90210', date: 'May 08, 2026', status: 'In Transit', total: '₹45,999', statusType: 'transit' },
    { id: 'LX-88721', date: 'May 03, 2026', status: 'Delivered', total: '₹12,500', statusType: 'delivered' },
    { id: 'LX-87612', date: 'April 28, 2026', status: 'Delivered', total: '₹8,900', statusType: 'delivered' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading || !user) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading profile...</div>;
  }

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Guest';

  return (
    <motion.div 
      className={styles.overview}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles.welcomeBanner} variants={itemVariants}>
        <div className={styles.bannerContent}>
          <h2>Welcome Back, {firstName}</h2>
          <p>You have 2 premium shipments arriving by Tuesday. Track your style journey.</p>
        </div>
        <button className={styles.bannerBtn}>Track Shipments</button>
      </motion.div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <motion.div 
            key={stat.name} 
            className={styles.statCard}
            variants={itemVariants}
          >
            <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statName}>{stat.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className={styles.recentOrders} variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <h3>Latest Purchases</h3>
          <button className={styles.viewAll}>View History <ArrowRight size={16} /></button>
        </div>
        <div className={styles.ordersTable}>
          {recentOrders.map((order) => (
            <div key={order.id} className={styles.orderRow}>
              <div className={styles.orderId}>
                <Package size={16} style={{ marginRight: '10px', color: 'var(--primary)' }} />
                {order.id}
              </div>
              <div className={styles.orderDate}>{order.date}</div>
              <div className={styles.orderStatus}>
                <span className={order.statusType === 'delivered' ? styles.statusDelivered : styles.statusTransit}>
                  {order.statusType === 'transit' ? <Truck size={12} style={{marginRight: '6px'}}/> : <CheckCircle size={12} style={{marginRight: '6px'}}/>}
                  {order.status}
                </span>
              </div>
              <div className={styles.orderTotal}>{order.total}</div>
              <button className={styles.viewBtn}>Manage</button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountOverview;

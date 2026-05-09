"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, Percent, User, ShoppingCart } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  return (
    <div className={styles.bottomNav}>
      <Link href="/" className={styles.navItem}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link href="/shop" className={styles.navItem}>
        <ShoppingBag size={24} />
        <span>Buy</span>
      </Link>
      <Link href="/deals" className={styles.navItem}>
        <Percent size={24} />
        <span>Top Deals</span>
      </Link>
      <Link href="/account" className={styles.navItem}>
        <User size={24} />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default BottomNav;

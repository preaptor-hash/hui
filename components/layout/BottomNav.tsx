"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, Percent, User, ShieldAlert, LogIn } from 'lucide-react';
import styles from './BottomNav.module.css';
import { useAuth } from '@/lib/AuthContext';

const BottomNav = () => {
  const { user, isAdmin } = useAuth();

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
      
      {isAdmin ? (
        <Link href="/admin" className={styles.navItem} style={{ color: 'var(--primary)' }}>
          <ShieldAlert size={24} />
          <span>Admin</span>
        </Link>
      ) : (
        <Link href="/deals" className={styles.navItem}>
          <Percent size={24} />
          <span>Deals</span>
        </Link>
      )}

      {user ? (
        <Link href="/account" className={styles.navItem}>
          <User size={24} />
          <span>Account</span>
        </Link>
      ) : (
        <Link href="/login" className={styles.navItem}>
          <LogIn size={24} />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default BottomNav;

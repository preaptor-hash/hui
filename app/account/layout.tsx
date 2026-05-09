"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, CreditCard, Settings, LogOut, User } from 'lucide-react';
import styles from './Account.module.css';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', href: '/account', icon: <LayoutDashboard size={20} /> },
    { name: 'My Orders', href: '/account/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Wishlist', href: '/account/wishlist', icon: <Heart size={20} /> },
    { name: 'Addresses', href: '/account/addresses', icon: <MapPin size={20} /> },
    { name: 'Payment Methods', href: '/account/payment', icon: <CreditCard size={20} /> },
    { name: 'Settings', href: '/account/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}><User size={32} /></div>
                <div className={styles.badge}>Platinum</div>
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>John Doe</h3>
                <p className={styles.userEmail}>john.doe@example.com</p>
                <span className={styles.memberSince}>Member since 2023</span>
              </div>
            </div>

            <nav className={styles.nav}>
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`${styles.navLink} ${pathname === item.href ? styles.activeLink : ''}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button className={styles.logoutBtn}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;

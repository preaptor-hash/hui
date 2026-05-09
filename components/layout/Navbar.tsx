"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

import { useCart } from '@/lib/CartContext';
import { useNotifications } from '@/lib/NotificationContext';
import { useAuth } from '@/lib/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { unreadCount } = useNotifications();
  const { user, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const trending = ['Limited Edition Watches', 'Luxury Loungewear', 'Artisan Perfumes', 'Minimalist Tech'];
  const quickCategories = ['Men', 'Women', 'Accessories', 'Beauty', 'Home'];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Deals', href: '/deals' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeSearch = () => {
    setIsSearchActive(false);
    // Remove focus from input if any
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isSearchActive ? styles.navSearchActive : ''}`}>
        <div className={`container ${styles.container}`}>
          {/* Brand */}
          <Link href="/" className={styles.logo}>
            <span className="text-gradient">Indica</span>
            <span className={styles.logoAccent}>Luxe</span>
          </Link>

          {/* Search */}
          <div className={`${styles.searchContainer} ${isSearchActive ? styles.searchActive : ''}`}>
            <div className={styles.searchBar}>
              <Search size={17} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search products, brands and more..." 
                className={styles.searchInput}
                onFocus={() => setIsSearchActive(true)}
              />
              <button type="button" className={styles.searchBtn}>Search</button>
            </div>

            {/* Premium Search Overlay */}
            <AnimatePresence>
              {isSearchActive && (
                <motion.div 
                  className={styles.searchOverlay}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={styles.overlayContent}>
                    <div className={styles.overlayHeader}>
                      <h3>Discover Trending</h3>
                      <button className={styles.closeSearch} onClick={closeSearch}>
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className={styles.trendingList}>
                      {trending.map(item => (
                        <button key={item} className={styles.trendingItem}>
                          <Search size={14} /> {item}
                        </button>
                      ))}
                    </div>

                    <div className={styles.quickCats}>
                      <h4>Quick Categories</h4>
                      <div className={styles.catGrid}>
                        {quickCategories.map(cat => (
                          <Link key={cat} href={`/shop/${cat.toLowerCase()}`} className={styles.catItem} onClick={() => setIsSearchActive(false)}>
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Links */}
          <div className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <Link href="/wishlist" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Wishlist">
              <Heart size={20} />
            </Link>
            <Link href="/notifications" className={styles.iconBtn} aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </Link>
            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </Link>

            {isAdmin && (
              <Link href="/admin" className={styles.iconBtn} aria-label="Admin Dashboard" style={{ color: 'var(--primary)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Admin</span>
              </Link>
            )}

            {user ? (
              <Link href="/account" className={styles.userAvatar} aria-label="Profile">
                <User size={18} />
              </Link>
            ) : (
              <Link href="/login" className={styles.loginBtn}>
                Login
              </Link>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isSearchActive && (
            <motion.div 
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSearch}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;

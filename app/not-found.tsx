"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Lost in Luxury?</h1>
          <p className={styles.subtitle}>
            The page you're looking for might have been moved, deleted, or never existed. 
            Let's get you back to the finest collections.
          </p>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <input type="text" placeholder="What are you looking for?" />
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryBtn}>
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <Link href="/shop" className={styles.secondaryBtn}>
              <ShoppingBag size={20} />
              <span>Explore Shop</span>
            </Link>
          </div>

          <div className={styles.suggestions}>
            <h4>Popular Pages</h4>
            <div className={styles.suggestionLinks}>
              <Link href="/deals" className={styles.sLink}>
                <span>Top Deals</span>
                <ChevronRight size={14} />
              </Link>
              <Link href="/account" className={styles.sLink}>
                <span>Your Account</span>
                <ChevronRight size={14} />
              </Link>
              <Link href="/contact" className={styles.sLink}>
                <span>Customer Support</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

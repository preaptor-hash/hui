"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/constants/products';
import styles from '../Account.module.css';

const WishlistPage = () => {
  const wishlistItems = products.slice(2, 6);

  return (
    <div className={styles.wishlistPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Wishlist</h1>
        <p className={styles.subtitle}>Items you've saved for your future luxury acquisitions.</p>
      </header>

      <div className={styles.wishlistGrid}>
        <AnimatePresence>
          {wishlistItems.map((product, idx) => (
            <motion.div 
              key={product.id}
              className={styles.wishlistCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className={styles.wishlistImg}>
                <img src={product.image} alt={product.name} />
                <button className={styles.removeBtn} aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className={styles.wishlistInfo}>
                <Link href={`/product/${product.id}`} className={styles.wishlistName}>{product.name}</Link>
                <div className={styles.wishlistPrice}>
                  <span className={styles.currentPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className={styles.oldPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <button className={styles.addToCartBtn}>
                  <ShoppingCart size={16} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {wishlistItems.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><Heart size={48} strokeWidth={1} /></div>
            <h3>Your wishlist is empty</h3>
            <p>Start exploring our collections and save your favorite items.</p>
            <Link href="/shop" className={styles.shopNowBtn}>
              Explore Collections <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

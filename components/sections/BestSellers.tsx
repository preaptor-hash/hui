"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import { products } from '@/constants/products';
import styles from './BestSellers.module.css';

const BestSellers = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Electronics', 'Fashion', 'Home Decor'];
  
  const filteredProducts = activeFilter === 'All' 
    ? products.slice(0, 8) 
    : products.filter(p => p.category === activeFilter).slice(0, 8);

  return (
    <section className={styles.section}>
      <div className={`container`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.tag}>
              <Sparkles size={14} className={styles.sparkle} />
              <span>Top Rated</span>
            </div>
            <h2 className={styles.title}>Best Sellers</h2>
            <p className={styles.subtitle}>Our most loved products by thousands of customers.</p>
          </div>
          <Link href="/shop" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.filterBar}>
          {filters.map(filter => (
            <button 
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeFilter" 
                  className={styles.activeIndicator} 
                />
              )}
            </button>
          ))}
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;

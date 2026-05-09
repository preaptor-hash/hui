"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Percent, Clock, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/constants/products';
import styles from './DealsPage.module.css';

const DealsPage = () => {
  // Filter products with a discount
  const dealProducts = products.filter(p => p.originalPrice || p.discount).slice(0, 12);

  return (
    <div className={styles.page}>
      {/* Deals Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.badge}>
              <Zap size={14} fill="currentColor" />
              <span>Flash Deals Live</span>
            </div>
            <h1 className={styles.title}>Top Deals of the Day</h1>
            <p className={styles.subtitle}>Unbeatable prices on premium products. Grab them before they're gone!</p>
            
            <div className={styles.timerRow}>
              <span className={styles.endsIn}>Offer ends in:</span>
              <div className={styles.timer}>
                <div className={styles.tBox}>02<span>h</span></div>
                <div className={styles.tBox}>45<span>m</span></div>
                <div className={styles.tBox}>10<span>s</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${styles.activeTab}`}>All Deals</button>
              <button className={styles.tab}>Mobiles</button>
              <button className={styles.tab}>Fashion</button>
              <button className={styles.tab}>Home</button>
            </div>
            <div className={styles.stats}>
              Showing <strong>{dealProducts.length}</strong> active deals
            </div>
          </div>

          <div className={styles.grid}>
            {dealProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className={styles.loadMore}>
            <button className={styles.loadBtn}>Load More Deals</button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.promoSection}>
        <div className="container">
          <div className={styles.promoBanner}>
            <div className={styles.promoLeft}>
              <h3>Bank Offers</h3>
              <p>Extra 10% instant discount on Axis Bank & ICICI Bank cards.</p>
            </div>
            <button className={styles.promoBtn}>Learn More <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealsPage;

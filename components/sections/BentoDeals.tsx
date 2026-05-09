"use client";

import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './BentoDeals.module.css';

const BentoDeals = () => {
  const deals = [
    { title: 'Signature Chrono', image: '/medias/product_img1.71b51935.png', label: 'Limited Edition' },
    { title: 'Tech Elite Pro', image: '/medias/product_img6.51b328b9.png', label: 'Trending' },
    { title: 'Home Signature', image: '/medias/product_img10.019edc7f.png', label: 'New Arrival' },
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.bentoBox}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.header}>
            <div>
              <span className={styles.topTag}>Personalized for you</span>
              <h2>Continue your discovery</h2>
            </div>
            <button className={styles.viewAll}>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={styles.grid}>
            {deals.map((deal, i) => (
              <motion.div 
                key={i} 
                className={styles.card}
                whileHover={{ y: -5 }}
              >
                <div className={styles.imgWrapper}>
                  <img src={deal.image} alt={deal.title} />
                </div>
                <div className={styles.label}>{deal.label}</div>
                <div className={styles.dealTitle}>{deal.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={`${styles.bentoBox} ${styles.techBox}`}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.header}>
            <div>
              <span className={styles.topTag}>Premium Electronics</span>
              <h2>The Tech Elite Collection</h2>
            </div>
          </div>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <img src="/medias/product_img8.db630d17.png" alt="Tech" />
              <div className={styles.techInfo}>
                <span className={styles.from}>Elite Wearables</span>
                <span className={styles.techName}>Starting from ₹8,999</span>
              </div>
            </div>
            <div className={styles.techItem}>
              <img src="/medias/product_img6.51b328b9.png" alt="Audio" />
              <div className={styles.techInfo}>
                <span className={styles.from}>Pure Audio</span>
                <span className={styles.techName}>ANC Series • ₹15,999</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoDeals;

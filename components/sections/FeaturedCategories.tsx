"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/constants/products';
import styles from './FeaturedCategories.module.css';

const FeaturedCategories = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
          <div className={styles.underline}></div>
        </div>

        <div className={styles.scrollArea}>
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.name}
              className={styles.cardWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/shop/${cat.name.toLowerCase()}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={cat.image} alt={cat.name} className={styles.image} />
                  <div className={styles.overlay}></div>
                  <h3 className={styles.catName}>{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

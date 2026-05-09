"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CategoryCollage.module.css';

const categories = [
  { 
    name: 'Luxury Apparel', 
    label: 'The Silk Collection',
    discount: 'Min. 50% Off', 
    image: '/medias/product_img4.60bc85fd.png', 
    size: 'large' 
  },
  { 
    name: 'Smart Essentials', 
    label: 'Modern Minimalist',
    price: 'From ₹1,199', 
    image: '/medias/product_img9.4a473750.png', 
    size: 'small' 
  },
  { 
    name: 'Luxe Tech', 
    label: 'Elite Wearables',
    discount: 'New Season', 
    image: '/medias/product_img8.db630d17.png', 
    size: 'small' 
  },
  { 
    name: 'Home Signature', 
    label: 'Architectural Objects',
    discount: 'Min. 30% Off', 
    image: '/medias/product_img10.019edc7f.png', 
    size: 'wide' 
  },
];

const CategoryCollage = () => {
  return (
    <section className={styles.section}>
      <div className={`container`}>
        <div className={styles.header}>
          <span className="section-tag">Explore Excellence</span>
          <h2 className="section-title">Curated Collections</h2>
          <p className="section-subtitle">Discover our hand-picked selections for your unique lifestyle journey.</p>
        </div>
        
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link key={i} href="/shop" passHref>
              <motion.div 
                className={`${styles.card} ${styles[cat.size]}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={cat.image} alt={cat.name} className={styles.image} />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <span className={styles.catName}>{cat.name}</span>
                    <h3 className={styles.catLabel}>{cat.label}</h3>
                    <p className={styles.catValue}>{cat.discount || cat.price}</p>
                  </div>
                  <div className={styles.arrowBtn}>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCollage;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className={styles.section}>
      <motion.div 
        className={`container ${styles.container}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>Join the Elite Circle</h2>
          <p className={styles.subtitle}>Subscribe to receive exclusive offers, early access to new collections, and luxury lifestyle inspiration.</p>
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="Enter your email address" className={styles.input} required />
              <button type="submit" className={styles.btn}>Subscribe Now</button>
            </div>
          </form>
          
          <p className={styles.privacy}>By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;

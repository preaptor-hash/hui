"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import styles from './FlashSale.module.css';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 10
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.banner}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.left}>
            <div className={styles.badge}>
              <Zap size={14} fill="currentColor" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className={styles.title}>Rush Hour <span className={styles.gradientText}>Flash Sale</span></h2>
            <p className={styles.subtitle}>Grab your favorites at up to 70% off. Hurry, the clock is ticking!</p>
            
            <div className={styles.timerContainer}>
              <div className={styles.timeBlock}>
                <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>HRS</span>
              </div>
              <span className={styles.separator}>:</span>
              <div className={styles.timeBlock}>
                <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>MIN</span>
              </div>
              <span className={styles.separator}>:</span>
              <div className={styles.timeBlock}>
                <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>SEC</span>
              </div>
            </div>

            <Link href="/deals" className={styles.shopBtn}>
              Shop the Sale <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.right}>
            <div className={styles.saleGraphics}>
              <div className={styles.circle1}></div>
              <div className={styles.circle2}></div>
              <div className={styles.saleText}>70% OFF</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSale;

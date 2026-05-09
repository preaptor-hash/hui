"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const slides = [
  {
    image: '/medias/hero_model_img.0d0d8155.png',
    tag: 'New Season',
    title: 'Elevate Your\nStyle Game',
    subtitle: 'Curated luxury collections for the modern connoisseur',
    cta: 'Shop Now',
    href: '/shop',
    accent: '#6366f1',
  },
  {
    image: '/medias/hero_product_img1.4a9c2d69.png',
    tag: 'Flash Deal',
    title: 'Up to 70% Off\nPremium Brands',
    subtitle: 'Limited time offers on top brands. Don\'t miss out.',
    cta: 'View Deals',
    href: '/deals',
    accent: '#f5576c',
  },
  {
    image: '/medias/hero_product_img2.3a66bbed.png',
    tag: 'Trending',
    title: 'Signature\nCollection',
    subtitle: 'Fresh arrivals crafted for warmth, style and comfort',
    cta: 'Explore',
    href: '/categories',
    accent: '#f7971e',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={styles.slide}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className={styles.slideImage}
          />
          <div className={styles.gradient} />

          {/* Overlay Text */}
          <div className={styles.contentWrapper}>
            <div className="container">
              <div className={styles.content}>
                <motion.span
                  className={styles.tag}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {slides[current].tag}
                </motion.span>
                <motion.h1
                  className={styles.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {slides[current].title.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </motion.h1>
                <motion.p
                  className={styles.subtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {slides[current].subtitle}
                </motion.p>
                <Link href={slides[current].href} passHref legacyBehavior>
                  <motion.a
                    className={styles.cta}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {slides[current].cta} →
                  </motion.a>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

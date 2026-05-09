'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image: string;
  discount?: number;
  is_new?: boolean;
  rating?: number;
  categories?: { name: string } | null;
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tag}>
              <Zap size={14} />
              Admin Picks
            </span>
            <h2 className={styles.title}>Featured Collection</h2>
            <p className={styles.subtitle}>Handpicked by our curators for the discerning shopper.</p>
          </div>
          <Link href="/shop" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className={`${styles.card} ${i === 0 ? styles.cardLarge : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  {product.discount && (
                    <span className={styles.discountBadge}>-{product.discount}%</span>
                  )}
                  {product.is_new && (
                    <span className={styles.newBadge}>New</span>
                  )}
                </div>
                <div className={styles.info}>
                  <span className={styles.category}>
                    {(product.categories as {name:string} | null)?.name || 'Luxury'}
                  </span>
                  <h3 className={styles.name}>{product.name}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>₹{product.price?.toLocaleString()}</span>
                    {product.original_price && (
                      <span className={styles.originalPrice}>₹{product.original_price?.toLocaleString()}</span>
                    )}
                  </div>
                  {product.rating && (
                    <div className={styles.rating}>
                      <Star size={12} fill="#c4a163" color="#c4a163" />
                      <span>{product.rating}</span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

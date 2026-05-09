"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/constants/products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(prev => !prev);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/product/${product.id}`} className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
        
        {/* Badges */}
        <div className={styles.badges}>
          {discount && <span className={styles.discountBadge}>{discount}% OFF</span>}
          {product.isNew && <span className={styles.newBadge}>NEW</span>}
        </div>

        {/* Actions Overlay */}
        <div className={styles.actionsOverlay}>
          <button
            className={`${styles.actionBtn} ${wishlisted ? styles.wishlisted : ''}`}
            onClick={handleWishlist}
            aria-label="Wishlist"
          >
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link href={`/product/${product.id}`} className={styles.actionBtn} aria-label="Quick View">
            <Eye size={16} />
          </Link>
        </div>
      </Link>

      <div className={styles.content}>
        {/* Rating */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span className={styles.ratingVal}>{product.rating ?? '4.2'}</span>
          </div>
          <span className={styles.reviewCount}>({product.reviews ?? '128'})</span>
        </div>

        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        <div className={styles.deliveryInfo}>Free delivery by <strong>14 May</strong></div>

        <button
          className={`${styles.cartBtn} ${addedToCart ? styles.cartBtnAdded : ''}`}
          onClick={handleCart}
        >
          <ShoppingCart size={15} />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

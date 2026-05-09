"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Heart, Share2, ShoppingCart, ShieldCheck, Truck, Calendar, Minus, Plus, ChevronRight, Award, CornerUpLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/constants/products';
import ProductCard from '@/components/ui/ProductCard';
import styles from './ProductDetail.module.css';

import { useCart } from '@/lib/CartContext';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart, updateQuantity: updateCartQuantity } = useCart();
  const [activeTab, setActiveTab] = useState('Description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Find product by slug/id
  const product = products.find(p => p.id === slug) || products[0];
  
  const handleAddToCart = () => {
    // Add multiple quantities if needed
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const thumbnails = [
    product.image,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const savings = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <div className={styles.breadcrumb}>
          <span className={styles.crumb}>Home</span>
          <ChevronRight size={14} className={styles.sep} />
          <span className={styles.crumb}>Shop</span>
          <ChevronRight size={14} className={styles.sep} />
          <span className={styles.crumb}>{product.category}</span>
          <ChevronRight size={14} className={styles.sep} />
          <span className={`${styles.crumb} ${styles.activeCrumb}`}>{product.name}</span>
        </div>

        <div className={styles.mainGrid}>
          {/* Gallery with Zoom Effect */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedImage}
                  src={thumbnails[selectedImage]} 
                  alt={product.name} 
                  className={styles.mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              {savings > 0 && <div className={styles.saveBadge}>-{savings}%</div>}
            </div>
            <div className={styles.thumbnails}>
              {thumbnails.map((img, i) => (
                <button 
                  key={i} 
                  className={`${styles.thumbBtn} ${selectedImage === i ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`Thumbnail ${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className={styles.info}>
            <div className={styles.header}>
              <div className={styles.tag}>Premium Selection</div>
              <h1 className={styles.title}>{product.name}</h1>
              
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < 4 ? "#f59e0b" : "none"} color={i < 4 ? "#f59e0b" : "#d1d5db"} />
                  ))}
                </div>
                <span className={styles.reviews}>4.8 (124 Reviews)</span>
                <div className={styles.divider}></div>
                <span className={styles.sku}>SKU: LX-2024-001</span>
              </div>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.mainPrice}>₹{product.price.toLocaleString('en-IN')}</div>
              {product.originalPrice && (
                <div className={styles.discountRow}>
                  <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className={styles.discountTag}>Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <p className={styles.description}>
              Crafted for those who demand excellence. This premium {product.name.toLowerCase()} offers an unparalleled experience with its sophisticated design and master-grade materials.
            </p>

            <div className={styles.selectors}>
              <div className={styles.selectorGroup}>
                <span className={styles.selectorLabel}>Color: <strong>Midnight Blue</strong></span>
                <div className={styles.colorOptions}>
                  <button className={`${styles.colorCircle} ${styles.activeColor}`} style={{ background: '#1e3a8a' }} />
                  <button className={styles.colorCircle} style={{ background: '#111827' }} />
                  <button className={styles.colorCircle} style={{ background: '#4b5563' }} />
                </div>
              </div>

              <div className={styles.selectorGroup}>
                <span className={styles.selectorLabel}>Size: <strong>{product.id === '1' ? 'Regular' : 'Medium'}</strong></span>
                <div className={styles.sizeOptions}>
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button key={s} className={`${styles.sizeBtn} ${s === 'M' ? styles.activeSize : ''}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.purchaseActions}>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
              </div>
              <button className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`} onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                <span>{isAdded ? 'Added to Bag!' : 'Add to Cart'}</span>
              </button>
            </div>

            <button className={styles.buyNowBtn}>Buy Now & Get Free Delivery</button>

            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <Truck size={20} className={styles.trustIcon} />
                <div className={styles.trustText}>
                  <strong>Free Express Delivery</strong>
                  <span>Delivered by 15th May</span>
                </div>
              </div>
              <div className={styles.trustItem}>
                <ShieldCheck size={20} className={styles.trustIcon} />
                <div className={styles.trustText}>
                  <strong>Premium Warranty</strong>
                  <span>12 Months Protection</span>
                </div>
              </div>
              <div className={styles.trustItem}>
                <CornerUpLeft size={20} className={styles.trustIcon} />
                <div className={styles.trustText}>
                  <strong>Easy 30-Day Returns</strong>
                  <span>Hassle-free process</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className={styles.detailsTabs}>
          <div className={styles.tabList}>
            {['Description', 'Specifications', 'Shipping', 'Reviews'].map(tab => (
              <button 
                key={tab} 
                className={`${styles.tabTrigger} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tabUnderline" className={styles.underline} />}
              </button>
            ))}
          </div>
          <div className={styles.tabPanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Description' && (
                  <div className={styles.descContent}>
                    <h3>The Art of Luxury</h3>
                    <p>Designed with meticulous attention to detail, the {product.name} stands as a testament to modern industrial design. Each component is chosen for its longevity and aesthetic appeal. Experience the perfect blend of form and function with a product that defines sophistication.</p>
                    <div className={styles.featuresGrid}>
                      <div className={styles.feature}>
                        <Award size={24} />
                        <h4>Master Grade</h4>
                        <p>Certified premium materials only.</p>
                      </div>
                      <div className={styles.feature}>
                        <Award size={24} />
                        <h4>Ergonomic</h4>
                        <p>Designed for comfort and ease.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Specifications' && (
                  <div className={styles.specsContent}>
                    <div className={styles.specsTable}>
                      <div className={styles.specRow}>
                        <span>Material</span>
                        <span>Aerospace-grade Aluminum / Premium Leather</span>
                      </div>
                      <div className={styles.specRow}>
                        <span>Dimensions</span>
                        <span>42cm x 28cm x 12cm</span>
                      </div>
                      <div className={styles.specRow}>
                        <span>Weight</span>
                        <span>1.2 kg</span>
                      </div>
                      <div className={styles.specRow}>
                        <span>Warranty</span>
                        <span>1 Year International Warranty</span>
                      </div>
                      <div className={styles.specRow}>
                        <span>In the Box</span>
                        <span>{product.name}, Authenticity Certificate, Care Guide</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Shipping' && (
                  <div className={styles.shippingContent}>
                    <div className={styles.shippingGrid}>
                      <div className={styles.shipCard}>
                        <Truck size={24} />
                        <h4>Express Delivery</h4>
                        <p>Complementary shipping on all orders above ₹50,000. Delivered within 3-5 business days.</p>
                      </div>
                      <div className={styles.shipCard}>
                        <ShieldCheck size={24} />
                        <h4>Insured Transit</h4>
                        <p>Every shipment is fully insured for its total value until it reaches your doorstep.</p>
                      </div>
                      <div className={styles.shipCard}>
                        <Calendar size={24} />
                        <h4>Order Tracking</h4>
                        <p>Receive real-time updates and a secure tracking link as soon as your product is dispatched.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Reviews' && (
                  <div className={styles.reviewsContent}>
                    <div className={styles.reviewsHeader}>
                      <div className={styles.avgRating}>
                        <span className={styles.bigRating}>4.8</span>
                        <div className={styles.stars}>
                          {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
                        </div>
                        <p>Based on 124 reviews</p>
                      </div>
                      <button className={styles.writeReviewBtn}>Write a Review</button>
                    </div>

                    <div className={styles.reviewsList}>
                      {[
                        { name: 'Alex M.', date: 'May 05, 2026', text: 'Absolutely stunning quality. The attention to detail is evident from the moment you unbox it.', rating: 5 },
                        { name: 'Sarah J.', date: 'April 28, 2026', text: 'Beautiful design and very functional. Fast delivery as well!', rating: 5 }
                      ].map((rev, i) => (
                        <div key={i} className={styles.reviewItem}>
                          <div className={styles.revHead}>
                            <strong>{rev.name}</strong>
                            <span>{rev.date}</span>
                          </div>
                          <div className={styles.revStars}>
                            {[...Array(rev.rating)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                          </div>
                          <p>{rev.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div className={styles.relatedSection}>
          <div className="section-header">
            <div>
              <span className="section-tag">More To Explore</span>
              <h2 className="section-title">Similar Masterpieces</h2>
            </div>
            <Link href="/shop" className="view-all-link">Browse All <ChevronRight size={16} /></Link>
          </div>
          <div className={styles.relatedGrid}>
            {products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <AnimatePresence>
        {isScrolledPast && (
          <motion.div 
            className={styles.stickyBar}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <div className={`container ${styles.stickyContent}`}>
              <div className={styles.stickyInfo}>
                <img src={product.image} alt="" />
                <div className={styles.stickyText}>
                  <strong>{product.name}</strong>
                  <span>₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className={styles.stickyActions}>
                <button className={`${styles.stickyCartBtn} ${isAdded ? styles.added : ''}`} onClick={handleAddToCart}>
                  {isAdded ? <Award size={18} /> : <ShoppingCart size={18} />}
                </button>
                <Link href="/checkout" className={styles.stickyBuyBtn}>Buy Now</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;

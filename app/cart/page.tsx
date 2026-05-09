"use client";

import React from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft, ShieldCheck, RotateCcw, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import styles from './Cart.module.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <motion.div 
          className={`container ${styles.emptyContainer}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.emptyIllustration}>
            <ShoppingBag size={80} strokeWidth={1} />
          </div>
          <h2 className={styles.emptyTitle}>Your Bag is Empty</h2>
          <p className={styles.emptyText}>Curate your style by exploring our latest premium collections.</p>
          <Link href="/shop" className={styles.startShoppingBtn}>
            Continue Exploring <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Shopping Bag</h1>
            <p className={styles.subtitle}>You have {cartItems.length} items in your bag</p>
          </div>
          <Link href="/shop" className={styles.backLink}>
            <ArrowLeft size={16} /> <span>Continue Shopping</span>
          </Link>
        </header>

        <div className={styles.layout}>
          {/* Items List */}
          <div className={styles.itemsList}>
            <div className={styles.listHeader}>
              <span>Product Details</span>
              <span>Quantity</span>
              <span>Total Price</span>
            </div>
            
            <AnimatePresence mode="popLayout">
              {cartItems.map(item => (
                <motion.div 
                  key={item.id} 
                  className={styles.cartItem}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className={styles.itemMain}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <Link href={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                      <p className={styles.itemVariant}>Ref: LX-2024-{item.id.padStart(3, '0')}</p>
                      <div className={styles.itemMeta}>
                        <span className={styles.stockStatus}>In Stock</span>
                        <div className={styles.mobileQuantity}>
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemQuantity}>
                    <div className={styles.stepper}>
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                    </div>
                  </div>

                  <div className={styles.itemPrice}>
                    <div className={styles.priceContainer}>
                      <span className={styles.lineTotal}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      <span className={styles.unitPrice}>₹{item.price.toLocaleString('en-IN')} / unit</span>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)} title="Remove Item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              
              <div className={styles.summaryTable}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <div className={styles.rowLabel}>
                    <span>Shipping</span>
                    <span className={styles.infoTag}>Express</span>
                  </div>
                  <span className={shipping === 0 ? styles.free : ''}>
                    {shipping === 0 ? 'Complementary' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Estimated Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className={styles.promoSection}>
                <label>Voucher Code</label>
                <div className={styles.promoInput}>
                  <input type="text" placeholder="Enter code" />
                  <button>Apply</button>
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <div className={styles.totalRow}>
                  <span>Total Amount</span>
                  <span className={styles.totalAmount}>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className={styles.taxNote}>VAT included where applicable</p>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Checkout Securely <ChevronRight size={18} />
              </Link>

              <div className={styles.trustFooter}>
                <div className={styles.trustItem}>
                  <ShieldCheck size={16} />
                  <span>Secure SSL Checkout</span>
                </div>
                <div className={styles.trustItem}>
                  <RotateCcw size={16} />
                  <span>Easy 30-Day Returns</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Lock, CreditCard, Landmark, Wallet, Truck, ChevronRight, MapPin, Package } from 'lucide-react';
import { products } from '@/constants/products';
import styles from './Checkout.module.css';

import { useCart } from '@/lib/CartContext';

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, subtotal } = useCart();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      router.push('/order/success/ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  };

  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Review' }
  ];

  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        {/* Progress Stepper */}
        <div className={styles.stepper}>
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`${styles.step} ${step >= s.id ? styles.activeStep : ''}`}>
                <div className={styles.stepCircle}>
                  {step > s.id ? <Check size={18} /> : s.id}
                </div>
                <span className={styles.stepLabel}>{s.name}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`${styles.line} ${step > s.id ? styles.activeLine : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.layout}>
          <motion.div 
            className={styles.main}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.formSection}
                >
                  <h2><MapPin size={24} className="text-gradient" /> Shipping Details</h2>
                  <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                      <label>First Name</label>
                      <input type="text" placeholder="John" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Last Name</label>
                      <input type="text" placeholder="Doe" />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.full}`}>
                      <label>Email Address</label>
                      <input type="email" placeholder="john.doe@indicaluxe.com" />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.full}`}>
                      <label>Street Address</label>
                      <input type="text" placeholder="123 Luxury Avenue, Penthouse 4B" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>City</label>
                      <input type="text" placeholder="Mumbai" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Postal Code</label>
                      <input type="text" placeholder="400001" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.formSection}
                >
                  <h2><CreditCard size={24} className="text-gradient" /> Payment Method</h2>
                  <div className={styles.paymentTabs}>
                    <button className={styles.activePaymentTab}><CreditCard size={18} /> Card</button>
                    <button><Landmark size={18} /> Bank</button>
                    <button><Wallet size={18} /> UPI</button>
                  </div>
                  <div className={styles.grid}>
                    <div className={`${styles.inputGroup} ${styles.full}`}>
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="JOHN DOE" />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.full}`}>
                      <label>Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM / YY" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Security Code (CVV)</label>
                      <input type="password" placeholder="***" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.formSection}
                >
                  <h2><Package size={24} className="text-gradient" /> Order Review</h2>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewCard}>
                      <h3>Delivery Address</h3>
                      <p>John Doe</p>
                      <p>123 Luxury Avenue, Penthouse 4B</p>
                      <p>Mumbai, Maharashtra 400001</p>
                      <button className={styles.editBtn} onClick={() => setStep(1)}>Modify</button>
                    </div>
                    <div className={styles.reviewCard}>
                      <h3>Payment Information</h3>
                      <p>Visa Credit Card</p>
                      <p>Ending in •••• 4242</p>
                      <button className={styles.editBtn} onClick={() => setStep(2)}>Change</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.actions}>
              {step > 1 ? (
                <button className={styles.backBtn} onClick={() => setStep(step - 1)}>Go Back</button>
              ) : <div></div>}
              <button className={styles.nextBtn} onClick={handleNext}>
                {step === 3 ? 'Confirm Order' : 'Continue to ' + steps[step].name}
                <ChevronRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </motion.div>

          <aside className={styles.summary}>
            <motion.div 
              className={styles.summaryCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Order Summary</h3>
              <div className={styles.miniList}>
                {cartItems.map(item => (
                  <div key={item.id} className={styles.miniItem}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.miniDetails}>
                      <p>{item.name}</p>
                      <span>Premium Selection</span>
                    </div>
                    <span className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.row}>
                <span>Shipping</span>
                <span className={shipping === 0 ? styles.free : ''}>
                  {shipping === 0 ? 'Complementary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className={styles.row}>
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={`${styles.row} ${styles.total}`}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.trustInfo}>
                <ShieldCheck size={14} style={{ color: '#10b981' }} />
                <span>Verified Secure Checkout</span>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

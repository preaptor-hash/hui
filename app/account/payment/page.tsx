"use client";

import React from 'react';
import { CreditCard, Plus, ShieldCheck, MoreVertical, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../Account.module.css';

const PaymentPage = () => {
  const cards = [
    {
      id: 1,
      brand: 'Visa',
      last4: '4242',
      expiry: '05/27',
      name: 'John Doe',
      isDefault: true,
      color: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    },
    {
      id: 2,
      brand: 'Mastercard',
      last4: '8812',
      expiry: '09/25',
      name: 'John Doe',
      isDefault: false,
      color: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)'
    }
  ];

  return (
    <div className={styles.paymentPage}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <h1 className={styles.title}>Payment Methods</h1>
          <p className={styles.subtitle}>Securely manage your premium payment options.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} />
          <span>Add New Card</span>
        </button>
      </header>

      <div className={styles.cardGrid}>
        {cards.map((card, idx) => (
          <motion.div 
            key={card.id}
            className={styles.paymentCard}
            style={{ background: card.color }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.cardChip}></div>
            <div className={styles.cardTop}>
              <span className={styles.cardBrand}>{card.brand}</span>
              <button className={styles.cardMenu}><MoreVertical size={20} /></button>
            </div>
            <div className={styles.cardNumber}>
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>{card.last4}</span>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.cardHolder}>
                <span className={styles.label}>Card Holder</span>
                <span className={styles.value}>{card.name}</span>
              </div>
              <div className={styles.cardExpiry}>
                <span className={styles.label}>Expires</span>
                <span className={styles.value}>{card.expiry}</span>
              </div>
            </div>
            {card.isDefault && <div className={styles.activeBadge}>Preferred</div>}
          </motion.div>
        ))}

        <motion.div 
          className={styles.addCardPlaceholder}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.addIcon}><Plus size={32} /></div>
          <span>Add New Payment Method</span>
        </motion.div>
      </div>

      <div className={styles.paymentSecurity}>
        <div className={styles.securityItem}>
          <ShieldCheck size={24} className={styles.securityIcon} />
          <div className={styles.securityText}>
            <h4>Secure Payments</h4>
            <p>Your payment information is encrypted and stored securely using industry-standard protocols.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

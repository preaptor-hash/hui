"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState<number | null>(null);

  const categories = ['All', 'Orders', 'Shipping', 'Returns', 'Payments', 'Account'];

  const faqs = [
    {
      id: 1,
      category: 'Shipping',
      question: 'How long does premium delivery take?',
      answer: 'Our premium delivery service typically takes 3-5 business days for domestic orders and 7-10 business days for international orders. You will receive a tracking link as soon as your order is dispatched.'
    },
    {
      id: 2,
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy for all unused and original-packaged items. Simply initiate a return request from your dashboard or contact our support team.'
    },
    {
      id: 3,
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, Net Banking, UPI (Google Pay, PhonePe, etc.), and digital wallets. All transactions are secured with 256-bit SSL encryption.'
    },
    {
      id: 4,
      category: 'Orders',
      question: 'Can I cancel my order after placement?',
      answer: 'Orders can be cancelled within 12 hours of placement or before they are dispatched, whichever is earlier. Once dispatched, you can initiate a return after receiving the product.'
    }
  ];

  const filteredFaqs = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>How can we help you today? Search or browse categories below.</p>
          
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input type="text" placeholder="Search for questions..." className={styles.searchInput} />
          </div>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.categories}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`${styles.catBtn} ${activeCategory === cat ? styles.activeCat : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.faqList}>
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className={`${styles.faqItem} ${openId === faq.id ? styles.open : ''}`}>
              <button className={styles.question} onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                <span>{faq.question}</span>
                {openId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.answer}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaCard}>
            <MessageCircle size={32} />
            <h3>Still have questions?</h3>
            <p>Our luxury support team is available 24/7 to assist you with any inquiries.</p>
            <button className={styles.contactBtn}>Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

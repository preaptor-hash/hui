'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './NewsletterSection.module.css';
import { supabase } from '@/lib/supabase';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call for now, since we don't have a newsletter table yet
    try {
      // In a real app, you would insert into a subscribers table
      // await supabase.from('subscribers').insert([{ email }]);
      
      setTimeout(() => {
        setStatus('success');
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      }, 1000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div 
          className={styles.wrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.content}>
            <span className={styles.tag}>Stay Updated</span>
            <h2 className={styles.title}>Join the Indica Luxe Club</h2>
            <p className={styles.subtitle}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            {status === 'success' ? (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={24} className={styles.successIcon} />
                <span>{message}</span>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                  />
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={status === 'loading' || !email}
                  >
                    {status === 'loading' ? 'Subscribing...' : (
                      <>Subscribe <Send size={16} /></>
                    )}
                  </button>
                </div>
                {status === 'error' && <p className={styles.errorMessage}>{message}</p>}
                <p className={styles.disclaimer}>
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

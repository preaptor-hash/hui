"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import { Chrome, Facebook } from '@/components/ui/BrandIcons';
import styles from '../login/Auth.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.splitLayout}>
        {/* Left Panel - Hero */}
        <div className={styles.heroPanel}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Join the World <br />of Luxury</h1>
            <p className={styles.heroSubtitle}>Create an account to start your premium shopping journey and unlock exclusive benefits.</p>
            <div className={styles.benefits}>
              <div className={styles.benefitItem}>✓ Priority Access to New Collections</div>
              <div className={styles.benefitItem}>✓ Exclusive Member-Only Pricing</div>
              <div className={styles.benefitItem}>✓ Personalized Luxury Recommendations</div>
            </div>
          </div>
          <div className={styles.overlay}></div>
        </div>

        {/* Right Panel - Form */}
        <div className={styles.formPanel}>
          <div className={styles.formContent}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Create Account</h2>
              <p className={styles.subtitle}>Enter your details to join our premium community</p>
            </div>

            <div className={styles.socialBtns}>
              <button className={styles.socialBtn}><Chrome size={18} /> Google</button>
              <button className={styles.socialBtn}><Facebook size={18} /> Facebook</button>
            </div>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.icon} />
                  <input type="text" placeholder="John Doe" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.icon} />
                  <input type="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.icon} />
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar} style={{ width: '40%', background: '#ff4d4d' }}></div>
                  <span>Weak</span>
                </div>
              </div>

              <div className={styles.checkboxRow}>
                <label className={styles.checkbox}>
                  <input type="checkbox" required />
                  <span>I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link></span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>Create Account</button>
            </form>

            <p className={styles.footerText}>
              Already have an account? <Link href="/login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Chrome, Facebook } from '@/components/ui/BrandIcons';
import styles from './Auth.module.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.splitLayout}>
        {/* Left Panel - Hero */}
        <div className={styles.heroPanel}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Experience Luxury <br />Redefined</h1>
            <p className={styles.heroSubtitle}>Join our exclusive circle of connoisseurs and elevate your lifestyle with premium curated products.</p>
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
              <h2 className={styles.title}>Welcome Back</h2>
              <p className={styles.subtitle}>Enter your credentials to access your account</p>
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
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.icon} />
                  <input type="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Password</label>
                  <Link href="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
                </div>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.icon} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                  />
                  <button 
                    type="button" 
                    className={styles.toggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.checkboxRow}>
                <label className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>Login to Account</button>
            </form>

            <p className={styles.footerText}>
              Don't have an account? <Link href="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

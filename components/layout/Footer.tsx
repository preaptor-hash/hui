"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { Facebook, Twitter, Instagram, Youtube } from '@/components/ui/BrandIcons';
import styles from './Footer.module.css';

const Footer = () => {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (window.innerWidth <= 640) {
      setOpenSection(openSection === section ? null : section);
    }
  };
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          {/* Brand & Info */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className="text-gradient">Indica</span>
              <span className={styles.logoAccent}>Luxe</span>
            </Link>
            <p className={styles.brandDesc}>
              Defining the future of luxury commerce. We bring you curated masterpieces from global artisans, delivered with an uncompromising commitment to quality.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${styles.linksCol} ${openSection === 'company' ? styles.colOpen : ''}`}>
            <h4 className={styles.colTitle} onClick={() => toggleSection('company')}>
              Company
              <span className={styles.toggleIcon}>
                {openSection === 'company' ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/shop">Luxury Shop</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">Help & FAQ</Link></li>
            </ul>
          </div>

          <div className={`${styles.linksCol} ${openSection === 'collections' ? styles.colOpen : ''}`}>
            <h4 className={styles.colTitle} onClick={() => toggleSection('collections')}>
              Collections
              <span className={styles.toggleIcon}>
                {openSection === 'collections' ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li><Link href="/shop/fashion">Fashion House</Link></li>
              <li><Link href="/shop/electronics">Tech Elite</Link></li>
              <li><Link href="/shop/home">Home Signature</Link></li>
              <li><Link href="/deals">Limited Editions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Insider Access</h4>
            <p className={styles.newsDesc}>Subscribe to receive exclusive invitations to our private collections and seasonal releases.</p>
            <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <button type="submit">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.icon} />
              <span>123 Luxury Lane, Fashion City</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.icon} />
              <span>+1 (234) 567-890</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.icon} />
              <span>curator@indicaluxe.com</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <p>© 2025 Indica Luxe. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className={styles.payments}>
            <img 
              src="/mastercard-visa-apple-pay-google-pay-popular-payment-systems-finance-system-app-bank-card-illustration-free-vector.jpg" 
              alt="Payment Methods" 
              className={styles.paymentImg}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Facebook, Twitter, Instagram } from '@/components/ui/BrandIcons';
import styles from './Contact.module.css';

const ContactPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <h1>Contact <span className="text-gradient">Us</span></h1>
          <p>We're here to help you with anything you need. Reach out to our luxury concierge team.</p>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Info Side */}
          <div className={styles.infoSide}>
            <div className={styles.infoCard}>
              <div className={styles.cardItem}>
                <div className={styles.iconBox}><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>support@indicaluxe.com</p>
                  <p>concierge@indicaluxe.com</p>
                </div>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (234) 567-890</p>
                  <p>Toll Free: 1-800-LUXE</p>
                </div>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Luxury Lane, Fashion District</p>
                  <p>Mumbai, MH 400001</p>
                </div>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.iconBox}><Clock size={24} /></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className={styles.socialBox}>
              <h4>Follow Our Journey</h4>
              <div className={styles.socials}>
                <button><Facebook size={20} /></button>
                <button><Twitter size={20} /></button>
                <button><Instagram size={20} /></button>
              </div>
            </div>

            <div className={styles.mapMockup}>
              <div className={styles.mapOverlay}>
                <MapPin size={32} color="#667eea" />
                <span>Our Flagship Store</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formSide}>
            <div className={styles.formCard}>
              <h3>Send us a Message</h3>
              <p>We&apos;d love to hear from you. Our team is here to help with any inquiries.</p>
              
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  <select className={styles.select}>
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Product Information</option>
                    <option>Returns & Exchanges</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone Number (Optional)</label>
                  <input type="tel" placeholder="+1 (234) 567-890" />
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.labelRow}>
                    <label>Message</label>
                    <span>0/500 characters</span>
                  </div>
                  <textarea placeholder="How can we help you?" rows={6}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

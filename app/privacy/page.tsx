import React from 'react';
import { Shield, Lock, Eye, Server, UserCheck } from 'lucide-react';
import styles from './Policy.module.css';

const PrivacyPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <h1>Privacy <span className="text-gradient">Policy</span></h1>
          <p>Your privacy is our priority. Learn how we protect your personal data.</p>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.layout}>
          {/* Sidebar ToC */}
          <aside className={styles.sidebar}>
            <nav className={styles.toc}>
              <a href="#collection">1. Data Collection</a>
              <a href="#usage">2. How We Use Data</a>
              <a href="#sharing">3. Data Sharing</a>
              <a href="#rights">4. Your Rights</a>
              <a href="#security">5. Security Measures</a>
            </nav>
          </aside>

          {/* Content */}
          <main className={styles.content}>
            <section id="collection" className={styles.section}>
              <div className={styles.sectionHeader}>
                <Eye size={24} />
                <h2>1. Data Collection</h2>
              </div>
              <p>We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include:</p>
              <ul>
                <li>Name and contact information</li>
                <li>Payment details (processed securely)</li>
                <li>Shipping and billing addresses</li>
                <li>Communication preferences</li>
              </ul>
              <div className={styles.callout}>
                <strong>Note:</strong> We never store your full credit card details on our servers. All payments are handled by certified PCI-compliant providers.
              </div>
            </section>

            <section id="usage" className={styles.section}>
              <div className={styles.sectionHeader}>
                <Server size={24} />
                <h2>2. How We Use Data</h2>
              </div>
              <p>Your data allows us to provide a premium shopping experience, including:</p>
              <ul>
                <li>Processing and fulfilling your orders</li>
                <li>Personalizing your product recommendations</li>
                <li>Sending order updates and tracking info</li>
                <li>Improving our website performance</li>
              </ul>
            </section>

            <section id="rights" className={styles.section}>
              <div className={styles.sectionHeader}>
                <UserCheck size={24} />
                <h2>4. Your Rights</h2>
              </div>
              <p>Under GDPR and CCPA, you have several rights regarding your personal data:</p>
              <div className={styles.rightsGrid}>
                <div className={styles.rightCard}>
                  <h4>Access</h4>
                  <p>Request a copy of your personal data.</p>
                </div>
                <div className={styles.rightCard}>
                  <h4>Correction</h4>
                  <p>Update inaccurate or incomplete data.</p>
                </div>
                <div className={styles.rightCard}>
                  <h4>Deletion</h4>
                  <p>Request erasure of your data.</p>
                </div>
                <div className={styles.rightCard}>
                  <h4>Portability</h4>
                  <p>Transfer your data to another service.</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

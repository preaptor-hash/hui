"use client";

import React from 'react';
import { User, Bell, Lock, Shield, Eye, Smartphone, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../Account.module.css';

const SettingsPage = () => {
  const sections = [
    {
      title: 'Profile Settings',
      icon: <User size={20} />,
      fields: [
        { label: 'Full Name', type: 'text', value: 'John Doe' },
        { label: 'Email Address', type: 'email', value: 'john.doe@example.com' },
        { label: 'Phone Number', type: 'tel', value: '+91 98765 43210' }
      ]
    },
    {
      title: 'Security',
      icon: <Lock size={20} />,
      fields: [
        { label: 'Current Password', type: 'password', value: '********' },
        { label: 'New Password', type: 'password', placeholder: 'Enter new password' }
      ]
    }
  ];

  return (
    <div className={styles.settingsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Personalize your experience and manage security preferences.</p>
      </header>

      <div className={styles.settingsLayout}>
        <div className={styles.settingsSections}>
          {sections.map((section, idx) => (
            <motion.div 
              key={section.title}
              className={styles.settingsCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.sectionTitle}>
                {section.icon}
                <h3>{section.title}</h3>
              </div>
              <div className={styles.formGrid}>
                {section.fields.map((field) => (
                  <div key={field.label} className={styles.inputGroup}>
                    <label>{field.label}</label>
                    <input 
                      type={field.type} 
                      defaultValue={field.value} 
                      placeholder={field.placeholder}
                      className={styles.input}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div 
            className={styles.settingsCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.sectionTitle}>
              <Bell size={20} />
              <h3>Notifications</h3>
            </div>
            <div className={styles.toggleList}>
              <div className={styles.toggleItem}>
                <div className={styles.toggleInfo}>
                  <p className={styles.toggleLabel}>Order Updates</p>
                  <p className={styles.toggleDesc}>Receive SMS and email updates for your orders.</p>
                </div>
                <div className={styles.switchActive}></div>
              </div>
              <div className={styles.toggleItem}>
                <div className={styles.toggleInfo}>
                  <p className={styles.toggleLabel}>Newsletter</p>
                  <p className={styles.toggleDesc}>Get notified about new seasonal collections.</p>
                </div>
                <div className={styles.switchInactive}></div>
              </div>
            </div>
          </motion.div>

          <div className={styles.formActions}>
            <button className={styles.saveBtn}>
              <Save size={18} />
              <span>Save Changes</span>
            </button>
            <button className={styles.cancelBtn}>Discard Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

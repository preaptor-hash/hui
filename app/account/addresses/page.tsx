"use client";

import React from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../Account.module.css';

const AddressesPage = () => {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      icon: <Home size={18} />,
      name: 'John Doe',
      street: '123 Luxury Lane, Apartment 4B',
      city: 'Fashion City',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      icon: <Briefcase size={18} />,
      name: 'John Doe',
      street: 'Elite Business Plaza, Suite 900',
      city: 'Metro City',
      state: 'Karnataka',
      zip: '560001',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ];

  return (
    <div className={styles.addressesPage}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <h1 className={styles.title}>Shipping Addresses</h1>
          <p className={styles.subtitle}>Manage your delivery locations for faster checkout.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} />
          <span>Add New Address</span>
        </button>
      </header>

      <div className={styles.addressGrid}>
        {addresses.map((addr, idx) => (
          <motion.div 
            key={addr.id}
            className={`${styles.addressCard} ${addr.isDefault ? styles.defaultAddress : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.addressType}>
              <div className={styles.typeIcon}>{addr.icon}</div>
              <span className={styles.typeName}>{addr.type}</span>
              {addr.isDefault && <span className={styles.defaultBadge}>Default</span>}
            </div>
            
            <div className={styles.addressInfo}>
              <p className={styles.addrName}>{addr.name}</p>
              <p className={styles.addrStreet}>{addr.street}</p>
              <p className={styles.addrLocality}>{addr.city}, {addr.state} - {addr.zip}</p>
              <p className={styles.addrPhone}>Phone: {addr.phone}</p>
            </div>

            <div className={styles.addressActions}>
              <button className={styles.editBtn}><Edit2 size={16} /> Edit</button>
              <button className={styles.deleteBtn}><Trash2 size={16} /> Delete</button>
              {!addr.isDefault && (
                <button className={styles.setBtn}>Set as Default</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddressesPage;

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';
import styles from './TrustBar.module.css';

const TrustBar = () => {
  const features = [
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      subtitle: 'On orders over ₹10,000'
    },
    {
      icon: <RotateCcw size={32} />,
      title: '30-Day Returns',
      subtitle: 'Hassle-free exchanges'
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Secure Payment',
      subtitle: '100% protected payments'
    },
    {
      icon: <Headset size={32} />,
      title: '24/7 Support',
      subtitle: 'Dedicated luxury experts'
    }
  ];

  return (
    <div className={styles.trustBar}>
      <div className={`container ${styles.container}`}>
        {features.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.subtitle}>{item.subtitle}</p>
              </div>
            </div>
            {index < features.length - 1 && <div className={styles.divider}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;

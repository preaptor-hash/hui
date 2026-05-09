import React from 'react';
import { Award, Users, Globe, Briefcase } from 'lucide-react';
import { Linkedin, Twitter } from '@/components/ui/BrandIcons';
import styles from './About.module.css';

const AboutPage = () => {
  const stats = [
    { label: 'Years in Business', value: '12+', icon: <Briefcase size={24} /> },
    { label: 'Happy Customers', value: '500k+', icon: <Users size={24} /> },
    { label: 'Products Listed', value: '10k+', icon: <Award size={24} /> },
    { label: 'Countries Served', value: '45+', icon: <Globe size={24} /> },
  ];

  const values = [
    { title: 'Quality First', desc: 'We source only the finest materials and partner with master craftsmen to ensure every product meets our rigorous standards.', icon: '💎' },
    { title: 'Customer Obsessed', desc: 'Our concierge-level support is dedicated to providing a seamless luxury shopping experience from discovery to delivery.', icon: '🤝' },
    { title: 'Sustainably Minded', desc: 'We are committed to ethical sourcing and sustainable practices to protect our planet for future generations.', icon: '🌿' },
  ];

  const team = [
    { name: 'Elena Vance', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Marcus Chen', role: 'Head of Curation', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
    { name: 'Sophia Ricci', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <h1 className={styles.title}>Our <span className="text-gradient">Story</span></h1>
          <p className={styles.subtitle}>Redefining luxury for the modern world through curation and craftsmanship.</p>
        </div>
      </section>

      {/* Story */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyContainer}`}>
          <div className={styles.storyImage}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Brand Story" />
          </div>
          <div className={styles.storyContent}>
            <h3>A Legacy of Excellence</h3>
            <p>Founded in 2013, Indica Luxe began with a simple mission: to make high-end luxury accessible to those who appreciate the finer things in life. What started as a boutique collection of timepieces has grown into a global destination for premium lifestyle products.</p>
            <p>Our team of expert curators travels the world to find products that embody elegance, innovation, and timeless appeal. We believe that luxury is not just about the price tag, but about the story, the craftsmanship, and the feeling a product brings to your life.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Core Values</h2>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Meet the Visionaries</h2>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={styles.memberCard}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.memberSocials}>
                    <button><Linkedin size={18} /></button>
                    <button><Twitter size={18} /></button>
                  </div>
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

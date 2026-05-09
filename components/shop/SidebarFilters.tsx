"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './SidebarFilters.module.css';

const SidebarFilters = () => {
  const [expanded, setExpanded] = useState({
    price: true,
    categories: true,
    brands: true,
    ratings: true,
    colors: true,
    sizes: true
  });

  const toggle = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className={styles.sidebar}>
      {/* Price Range */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('price')}>
          <h4>Price Range</h4>
          {expanded.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.price && (
          <div className={styles.sectionContent}>
            <input type="range" min="0" max="50000" className={styles.rangeInput} />
            <div className={styles.priceInputs}>
              <input type="number" placeholder="Min" className={styles.numberInput} />
              <span>-</span>
              <input type="number" placeholder="Max" className={styles.numberInput} />
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('categories')}>
          <h4>Categories</h4>
          {expanded.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.categories && (
          <div className={styles.sectionContent}>
            {['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Accessories'].map(cat => (
              <label key={cat} className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>{cat}</span>
                <span className={styles.count}>(12)</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('colors')}>
          <h4>Colors</h4>
          {expanded.colors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.colors && (
          <div className={styles.sectionContent}>
            <div className={styles.colorGrid}>
              {['#000', '#fff', '#667eea', '#f5576c', '#4facfe', '#ffd200'].map(color => (
                <button 
                  key={color} 
                  className={styles.colorCircle} 
                  style={{ backgroundColor: color, border: color === '#fff' ? '1px solid #ddd' : 'none' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('sizes')}>
          <h4>Sizes</h4>
          {expanded.sizes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.sizes && (
          <div className={styles.sectionContent}>
            <div className={styles.sizeGrid}>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className={styles.sizePill}>{size}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.applyBtn}>Apply Filters</button>
        <button className={styles.resetBtn}>Reset All</button>
      </div>
    </aside>
  );
};

export default SidebarFilters;

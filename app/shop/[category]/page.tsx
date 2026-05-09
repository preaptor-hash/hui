"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Grid, List, ChevronDown, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarFilters from '@/components/shop/SidebarFilters';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/constants/products';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  
  const categoryName = typeof category === 'string' 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') 
    : 'All Collections';

  return (
    <div className={styles.page}>
      {/* Premium Category Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.breadcrumb}>
              <span className={styles.crumb}>Home</span>
              <span className={styles.separator}>/</span>
              <span className={styles.crumb}>Shop</span>
              <span className={styles.separator}>/</span>
              <span className={`${styles.crumb} ${styles.activeCrumb}`}>{categoryName}</span>
            </div>
            <h1 className={styles.title}>{categoryName}</h1>
            <p className={styles.subtitle}>Discover our exclusive range of {categoryName.toLowerCase()} curated for style and quality.</p>
          </motion.div>
        </div>
      </div>

      {/* Control Bar */}
      <div className={styles.controlBar}>
        <div className={`container ${styles.barContainer}`}>
          <div className={styles.barLeft}>
            <button 
              className={styles.mobileFilterBtn}
              onClick={() => setIsFilterMobileOpen(true)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            <div className={styles.desktopStats}>
              Showing <strong>{products.length}</strong> products
            </div>
          </div>
          
          <div className={styles.barRight}>
            <div className={styles.sortWrapper}>
              <ArrowUpDown size={16} className={styles.sortIcon} />
              <select className={styles.sortSelect}>
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
            </div>

            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewBtn} ${view === 'grid' ? styles.activeView : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid View"
              >
                <Grid size={18} />
              </button>
              <button 
                className={`${styles.viewBtn} ${view === 'list' ? styles.activeView : ''}`}
                onClick={() => setView('list')}
                aria-label="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainLayout}`}>
        {/* Sidebar for Desktop */}
        <div className={styles.sidebarWrapper}>
          <SidebarFilters />
        </div>
        
        {/* Product Grid Section */}
        <div className={styles.productSection}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={view === 'grid' ? styles.productGrid : styles.productList}
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.navBtn}>Previous</button>
            <div className={styles.pages}>
              <button className={`${styles.pageNumber} ${styles.activePage}`}>1</button>
              <button className={styles.pageNumber}>2</button>
              <button className={styles.pageNumber}>3</button>
              <span className={styles.dots}>...</span>
              <button className={styles.pageNumber}>12</button>
            </div>
            <button className={styles.navBtn}>Next</button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterMobileOpen && (
          <>
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterMobileOpen(false)}
            />
            <motion.div 
              className={styles.filterModal}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.modalHeader}>
                <h3>Filters</h3>
                <button onClick={() => setIsFilterMobileOpen(false)}>Close</button>
              </div>
              <div className={styles.modalContent}>
                <SidebarFilters />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;

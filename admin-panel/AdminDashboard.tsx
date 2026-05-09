'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import styles from './AdminPanel.module.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: productsData } = await supabase.from('products').select('*');
    const { data: ordersData } = await supabase.from('orders').select('*');
    
    if (productsData) {
      setProducts(productsData);
      setStats(prev => ({
        ...prev,
        totalProducts: productsData.length,
        lowStock: productsData.filter(p => p.reviews < 10).length // Using reviews as proxy for stock for now
      }));
    }
    
    if (ordersData) {
      setStats(prev => ({
        ...prev,
        totalOrders: ordersData.length,
        totalRevenue: ordersData.reduce((acc, o) => acc + (o.total_amount || 0), 0)
      }));
    }
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Indica<span>Luxe</span></h2>
        </div>
        <nav>
          <ul>
            <li className={styles.active}>Dashboard</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Customers</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div className={styles.adminProfile}>
            <span>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>₹{stats.totalRevenue.toLocaleString()}</p>
            <span className={styles.statTrend}>+12% from last month</span>
          </div>
          <div className={styles.statCard}>
            <h3>Active Orders</h3>
            <p className={styles.statValue}>{stats.totalOrders}</p>
            <span className={styles.statTrend}>4 pending</span>
          </div>
          <div className={styles.statCard}>
            <h3>Total Products</h3>
            <p className={styles.statValue}>{stats.totalProducts}</p>
            <span className={styles.statTrend}>12 Categories</span>
          </div>
          <div className={styles.statCard}>
            <h3>Low Stock</h3>
            <p className={styles.statValue}>{stats.lowStock}</p>
            <span className={styles.statWarning}>Action Required</span>
          </div>
        </section>

        <section className={styles.recentProducts}>
          <div className={styles.sectionHeader}>
            <h2>Recent Products</h2>
            <button className={styles.addBtn}>Add New Product</button>
          </div>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(product => (
                <tr key={product.id}>
                  <td><img src={product.image} alt={product.name} className={styles.tableImg} /></td>
                  <td>{product.name}</td>
                  <td>{product.category_id}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>{product.rating} ⭐</td>
                  <td>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

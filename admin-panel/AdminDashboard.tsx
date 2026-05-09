'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import styles from './AdminPanel.module.css';
import Image from 'next/image';
import ProductForm from './components/ProductForm';

type Tab = 'dashboard' | 'products' | 'orders' | 'categories' | 'settings';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  category_id: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  is_new: boolean;
  created_at: string;
  categories?: { name: string } | { name: string }[] | any;
}

interface Order {
  id: string;
  customer_name: string;
  status: string;
  total_amount: number;
  created_at: string;
}

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string, icon?: string}[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: productsData } = await supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false });
    const { data: categoriesData } = await supabase.from('categories').select('*');
    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    
    if (productsData) setProducts(productsData as Product[]);
    if (categoriesData) setCategories(categoriesData as {id: string, name: string, icon?: string}[]);
    if (ordersData) setOrders(ordersData as Order[]);
    
    if (productsData) {
      setStats(prev => ({
        ...prev,
        totalProducts: productsData.length
      }));
    }
    
    if (ordersData) {
      setStats(prev => ({
        ...prev,
        totalOrders: ordersData.length,
        totalRevenue: ordersData.reduce((acc, o) => acc + (o.total_amount || 0), 0),
        pendingOrders: ordersData.filter(o => o.status === 'pending').length
      }));
    }
    setLoading(false);
  }

  const handleSaveProduct = async (formData: Partial<Product>) => {
    if (editingProduct) {
      const { error } = await supabase.from('products').update(formData).eq('id', editingProduct.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('products').insert([formData]);
      if (error) alert(error.message);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <section className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Total Revenue</h3>
                <p className={styles.statValue}>₹{stats.totalRevenue.toLocaleString()}</p>
                <span className={styles.statTrend}>+12% from last month</span>
              </div>
              <div className={styles.statCard}>
                <h3>Active Orders</h3>
                <p className={styles.statValue}>{stats.totalOrders}</p>
                <span className={styles.statTrend}>{orders.filter(o => o.status === 'pending').length} pending</span>
              </div>
              <div className={styles.statCard}>
                <h3>Total Products</h3>
                <p className={styles.statValue}>{stats.totalProducts}</p>
                <span className={styles.statTrend}>{categories.length} Categories</span>
              </div>
              <div className={styles.statCard}>
                <h3>Pending Orders</h3>
                <p className={styles.statValue}>{stats.pendingOrders}</p>
                <span className={styles.statWarning}>Requires Attention</span>
              </div>
            </section>
            
            <section className={styles.recentProducts}>
              <div className={styles.sectionHeader}>
                <h2>Recent Orders</h2>
                <button className={styles.addBtn} onClick={() => setActiveTab('orders')}>View All</button>
              </div>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td>#{order.id.substring(0, 8)}</td>
                      <td>{order.customer_name || 'Guest'}</td>
                      <td><span className={styles.statusBadge}>{order.status}</span></td>
                      <td>₹{(order.total_amount || 0).toLocaleString()}</td>
                      <td>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        );
      case 'products':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>Manage Products</h2>
              <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>Add New Product</button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <Image 
                        src={product.image || 'https://via.placeholder.com/50'} 
                        alt={product.name || 'Product Image'} 
                        width={50}
                        height={50}
                        className={styles.tableImg} 
                        unoptimized
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{
                      Array.isArray(product.categories) 
                        ? product.categories[0]?.name 
                        : product.categories?.name || 'Uncategorized'
                    }</td>
                    <td>₹{(product.price || 0).toLocaleString()}</td>
                    <td>
                      <button className={styles.editBtn} onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}>Edit</button>
                      <button className={styles.deleteBtn} onClick={async () => {
                        if (confirm('Delete product?')) {
                          await supabase.from('products').delete().eq('id', product.id);
                          fetchData();
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case 'orders':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>Order Management</h2>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id.substring(0, 8)}</td>
                    <td>{order.customer_name}</td>
                    <td><span className={styles.statusBadge}>{order.status}</span></td>
                    <td>₹{order.total_amount?.toLocaleString()}</td>
                    <td>
                      <select 
                        value={order.status} 
                        onChange={async (e) => {
                          await supabase.from('orders').update({ status: e.target.value }).eq('id', order.id);
                          fetchData();
                        }}
                        className={styles.statusSelect}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case 'categories':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>Category Management</h2>
              <button className={styles.addBtn} onClick={async () => {
                const name = prompt('Enter Category Name:');
                if (name) {
                  await supabase.from('categories').insert([{ name }]);
                  fetchData();
                }
              }}>Add New Category</button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Icon</th>
                  <th>Product Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{cat.icon || 'N/A'}</td>
                    <td>{products.filter(p => p.category_id === cat.id).length} Products</td>
                    <td>
                      <button className={styles.deleteBtn} onClick={async () => {
                        if (confirm(`Delete category "${cat.name}"?`)) {
                          const { error } = await supabase.from('categories').delete().eq('id', cat.id);
                          if (error) alert('Cannot delete category with active products.');
                          fetchData();
                        }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case 'settings':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>Store Settings</h2>
              <button className={styles.saveBtn}>Save Changes</button>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Store Name</label>
                <input type="text" defaultValue="Indica Luxe" />
              </div>
              <div className={styles.formGroup}>
                <label>Store Email</label>
                <input type="email" defaultValue="admin@indicaluxe.com" />
              </div>
              <div className={styles.formGroup}>
                <label>Currency</label>
                <select defaultValue="INR">
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Maintenance Mode</label>
                <div className={styles.formCheckbox}>
                  <input type="checkbox" id="maintenance" />
                  <label htmlFor="maintenance">Enable Maintenance Mode</label>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return <div>Section not found.</div>;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <h2>Indica<span>Luxe</span></h2>
        </div>
        <nav>
          <ul>
            <li className={activeTab === 'dashboard' ? styles.active : ''} onClick={() => {setActiveTab('dashboard'); setIsSidebarOpen(false);}}>Dashboard</li>
            <li className={activeTab === 'products' ? styles.active : ''} onClick={() => {setActiveTab('products'); setIsSidebarOpen(false);}}>Products</li>
            <li className={activeTab === 'orders' ? styles.active : ''} onClick={() => {setActiveTab('orders'); setIsSidebarOpen(false);}}>Orders</li>
            <li className={activeTab === 'categories' ? styles.active : ''} onClick={() => {setActiveTab('categories'); setIsSidebarOpen(false);}}>Categories</li>
            <li className={activeTab === 'settings' ? styles.active : ''} onClick={() => {setActiveTab('settings'); setIsSidebarOpen(false);}}>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className={styles.adminProfile}>
            <span>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        {loading ? <div className={styles.loading}>Loading data...</div> : renderContent()}
      </main>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {isModalOpen && (
        <ProductForm 
          product={editingProduct} 
          categories={categories} 
          onSave={handleSaveProduct} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

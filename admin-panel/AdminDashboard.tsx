'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import styles from './AdminPanel.module.css';
import Image from 'next/image';
import ProductForm from './components/ProductForm';
import { Upload, X, Users, BarChart3, Image as ImageIcon, Layout } from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders' | 'categories' | 'banners' | 'users' | 'settings';

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
  stock?: number;
  featured?: boolean;
  created_at: string;
  categories?: { name: string } | { name: string }[] | null;
}

interface Order {
  id: string;
  customer_name: string;
  status: string;
  total_amount: number;
  user_id: string;
  created_at: string;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  cta_text: string;
  cta_href: string;
  image_url: string;
  accent_color: string;
  is_active: boolean;
  sort_order: number;
}

interface UserProfile {
  id: string;
  full_name: string;
  role: string;
  created_at?: string;
}

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalUsers: number;
  lowStock: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string, icon?: string}[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalUsers: 0,
    lowStock: 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [
      { data: productsData },
      { data: categoriesData },
      { data: ordersData },
      { data: bannersData },
      { data: usersData },
    ] = await Promise.all([
      supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('banners').select('*').order('sort_order'),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    ]);

    if (productsData) setProducts(productsData as Product[]);
    if (categoriesData) setCategories(categoriesData as {id: string, name: string, icon?: string}[]);
    if (ordersData) setOrders(ordersData as Order[]);
    if (bannersData) setBanners(bannersData as Banner[]);
    if (usersData) setUsers(usersData as UserProfile[]);

    const revenue = ordersData?.reduce((acc, o) => acc + (o.total_amount || 0), 0) || 0;
    const pending = ordersData?.filter(o => o.status === 'pending').length || 0;
    const lowStock = productsData?.filter(p => (p.stock || 0) < 10).length || 0;

    setStats({
      totalProducts: productsData?.length || 0,
      totalOrders: ordersData?.length || 0,
      totalRevenue: revenue,
      pendingOrders: pending,
      totalUsers: usersData?.length || 0,
      lowStock,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Image Upload to Supabase Storage
  const handleImageUpload = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    // eslint-disable-next-line react-hooks/purity
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filename, file, { cacheControl: '3600', upsert: false });

    if (error) {
      alert('Upload error: ' + error.message);
      setUploadingImage(false);
      return null;
    }

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(data.path);
    setUploadingImage(false);
    return urlData.publicUrl;
  };

  const handleSaveProduct = async (formData: any) => {
    const finalData = uploadedImageUrl ? { ...formData, image: uploadedImageUrl } : formData;
    if (editingProduct) {
      const { error } = await supabase.from('products').update(finalData).eq('id', editingProduct.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('products').insert([finalData]);
      if (error) alert(error.message);
    }
    setIsModalOpen(false);
    setUploadedImageUrl(null);
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
                <span className={styles.statTrend}>{stats.pendingOrders} pending</span>
              </div>
              <div className={styles.statCard}>
                <h3>Total Products</h3>
                <p className={styles.statValue}>{stats.totalProducts}</p>
                <span className={stats.lowStock > 0 ? styles.statWarning : styles.statTrend}>
                  {stats.lowStock > 0 ? `${stats.lowStock} low stock` : 'Stock healthy'}
                </span>
              </div>
              <div className={styles.statCard}>
                <h3>Total Users</h3>
                <p className={styles.statValue}>{stats.totalUsers}</p>
                <span className={styles.statTrend}>Registered customers</span>
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
              <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setUploadedImageUrl(null); setIsModalOpen(true); }}>+ Add Product</button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <Image
                        src={product.image || 'https://placehold.co/50x50'}
                        alt={product.name || 'Product Image'}
                        width={50}
                        height={50}
                        className={styles.tableImg}
                        unoptimized
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{Array.isArray(product.categories) ? ((product.categories as {name:string}[])[0]?.name || 'Uncategorized') : ((product.categories as {name:string} | null)?.name || 'Uncategorized')}</td>
                    <td>₹{(product.price || 0).toLocaleString()}</td>
                    <td>
                      <span style={{ color: (product.stock || 0) < 10 ? '#ef4444' : '#10b981' }}>
                        {product.stock ?? 100}
                      </span>
                    </td>
                    <td>
                      <button
                        className={product.featured ? styles.saveBtn : styles.cancelBtn}
                        style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                        onClick={async () => {
                          await supabase.from('products').update({ featured: !product.featured }).eq('id', product.id);
                          fetchData();
                        }}
                      >
                        {product.featured ? '★ Yes' : '☆ No'}
                      </button>
                    </td>
                    <td>
                      <button className={styles.editBtn} onClick={() => { setEditingProduct(product); setUploadedImageUrl(null); setIsModalOpen(true); }}>Edit</button>
                      <button className={styles.deleteBtn} onClick={async () => {
                        if (confirm('Delete this product?')) {
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
                  <th>Update Status</th>
                  <th>Notify</th>
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
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={styles.notifyBtn}
                        onClick={async () => {
                          const msg = prompt('Notification message for customer:');
                          if (msg && order.user_id) {
                            await supabase.from('notifications').insert([{
                              user_id: order.user_id,
                              title: `Order Update: ${order.status.toUpperCase()}`,
                              message: msg,
                              type: 'info'
                            }]);
                            alert('Sent!');
                          }
                        }}
                      >🔔</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );

      case 'banners':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>Hero Banner Management</h2>
            </div>
            <div className={styles.bannerGrid}>
              {banners.map(banner => (
                <div key={banner.id} className={styles.bannerCard}>
                  <div className={styles.bannerImgWrapper}>
                    <Image src={banner.image_url} alt={banner.title} width={300} height={150} unoptimized className={styles.bannerImg} />
                    <div className={styles.bannerBadge} style={{ background: banner.accent_color }}>
                      {banner.tag}
                    </div>
                  </div>
                  <div className={styles.bannerInfo}>
                    <h3>{banner.title}</h3>
                    <p>{banner.subtitle}</p>
                    <div className={styles.bannerActions}>
                      <button
                        className={banner.is_active ? styles.saveBtn : styles.cancelBtn}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                        onClick={async () => {
                          await supabase.from('banners').update({ is_active: !banner.is_active }).eq('id', banner.id);
                          fetchData();
                        }}
                      >
                        {banner.is_active ? '● Active' : '○ Inactive'}
                      </button>
                      <button className={styles.deleteBtn} onClick={async () => {
                        if (confirm('Delete this banner?')) {
                          await supabase.from('banners').delete().eq('id', banner.id);
                          fetchData();
                        }
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Banner Form */}
            <div className={styles.addBannerForm}>
              <h3>Add New Banner</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                let imageUrl = fd.get('image_url') as string;
                const file = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
                if (file) {
                  const uploaded = await handleImageUpload(file);
                  if (uploaded) imageUrl = uploaded;
                }
                await supabase.from('banners').insert([{
                  title: fd.get('title'),
                  subtitle: fd.get('subtitle'),
                  tag: fd.get('tag'),
                  cta_text: fd.get('cta_text') || 'Shop Now',
                  cta_href: fd.get('cta_href') || '/shop',
                  image_url: imageUrl,
                  accent_color: fd.get('accent_color') || '#6366f1',
                  is_active: true,
                  sort_order: banners.length + 1,
                }]);
                fetchData();
                (e.target as HTMLFormElement).reset();
              }} className={styles.formGrid}>
                <div className={styles.formGroup}><label>Title</label><input type="text" name="title" required /></div>
                <div className={styles.formGroup}><label>Subtitle</label><input type="text" name="subtitle" /></div>
                <div className={styles.formGroup}><label>Tag</label><input type="text" name="tag" placeholder="e.g. New Season" /></div>
                <div className={styles.formGroup}><label>CTA Text</label><input type="text" name="cta_text" defaultValue="Shop Now" /></div>
                <div className={styles.formGroup}><label>CTA Link</label><input type="text" name="cta_href" defaultValue="/shop" /></div>
                <div className={styles.formGroup}><label>Accent Color</label><input type="color" name="accent_color" defaultValue="#6366f1" /></div>
                <div className={styles.formGroup}><label>Image URL (or upload below)</label><input type="text" name="image_url" /></div>
                <div className={styles.formGroup}><label>Upload Image</label><input type="file" accept="image/*" /></div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn} disabled={uploadingImage}>
                    {uploadingImage ? 'Uploading...' : 'Add Banner'}
                  </button>
                </div>
              </form>
            </div>
          </section>
        );

      case 'users':
        return (
          <section className={styles.recentProducts}>
            <div className={styles.sectionHeader}>
              <h2>User Management</h2>
              <span className={styles.statTrend}>{users.length} registered users</span>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>User ID</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.full_name || 'Anonymous'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${user.role === 'admin' ? styles.adminBadge : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', opacity: 0.6 }}>{user.id.substring(0, 16)}...</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={async (e) => {
                          await supabase.from('profiles').update({ role: e.target.value }).eq('id', user.id);
                          fetchData();
                        }}
                        className={styles.statusSelect}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
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
                const name = prompt('Category Name:');
                if (name) {
                  await supabase.from('categories').insert([{ name }]);
                  fetchData();
                }
              }}>+ Add Category</button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{products.filter(p => p.category_id === cat.id).length} products</td>
                    <td>
                      <button className={styles.deleteBtn} onClick={async () => {
                        if (confirm(`Delete "${cat.name}"?`)) {
                          const { error } = await supabase.from('categories').delete().eq('id', cat.id);
                          if (error) alert('Cannot delete: has active products.');
                          else fetchData();
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
            {/* Image Upload Section */}
            <div className={styles.uploadSection}>
              <h3><ImageIcon size={18} /> Upload Product Image</h3>
              <p>Upload images to Supabase Storage for use in products and banners.</p>
              <div
                className={styles.dropZone}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={async (e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const url = await handleImageUpload(file);
                    if (url) setUploadedImageUrl(url);
                  }
                }}
              >
                <Upload size={32} />
                <p>{uploadingImage ? 'Uploading...' : 'Click or drag an image here'}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await handleImageUpload(file);
                      if (url) setUploadedImageUrl(url);
                    }
                  }}
                />
              </div>
              {uploadedImageUrl && (
                <div className={styles.uploadPreview}>
                  <Image src={uploadedImageUrl} alt="Uploaded" width={200} height={200} unoptimized />
                  <div>
                    <p className={styles.uploadUrl}>{uploadedImageUrl}</p>
                    <button className={styles.cancelBtn} onClick={() => {
                      navigator.clipboard.writeText(uploadedImageUrl);
                      alert('URL copied to clipboard!');
                    }}>Copy URL</button>
                    <button className={styles.deleteBtn} style={{ marginLeft: '0.5rem' }} onClick={() => setUploadedImageUrl(null)}>
                      <X size={14} /> Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label>Store Name</label><input type="text" defaultValue="Indica Luxe" /></div>
              <div className={styles.formGroup}><label>Store Email</label><input type="email" defaultValue="admin@indicaluxe.com" /></div>
              <div className={styles.formGroup}><label>Currency</label>
                <select defaultValue="INR">
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                </select>
              </div>
            </div>
          </section>
        );

      default:
        return <div>Section not found.</div>;
    }
  };

  const navItems: { tab: Tab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { tab: 'products', label: 'Products', icon: <ImageIcon size={18} /> },
    { tab: 'orders', label: 'Orders', icon: <Layout size={18} /> },
    { tab: 'banners', label: 'Hero Banners', icon: <Layout size={18} /> },
    { tab: 'users', label: 'Users', icon: <Users size={18} /> },
    { tab: 'categories', label: 'Categories', icon: <Layout size={18} /> },
    { tab: 'settings', label: 'Settings', icon: <Upload size={18} /> },
  ];

  return (
    <div className={styles.adminContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <h2>Indica<span>Luxe</span></h2>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Admin Panel</p>
        </div>
        <nav>
          <ul>
            {navItems.map(({ tab, label, icon }) => (
              <li
                key={tab}
                className={activeTab === tab ? styles.active : ''}
                onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
              >
                {icon} {label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h1>
          </div>
          <div className={styles.adminProfile}>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        {loading ? <div className={styles.loading} /> : renderContent()}
      </main>

      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setIsSidebarOpen(false)} />
      )}

      {isModalOpen && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onCancel={() => setIsModalOpen(false)}
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      )}
    </div>
  );
}

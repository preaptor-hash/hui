'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../AdminPanel.module.css';

interface ProductData {
  id?: string;
  name: string;
  price: number;
  original_price?: number;
  category_id: string;
  image: string;
  discount?: number;
  is_new: boolean;
  stock?: number;
  featured?: boolean;
}

interface ProductFormProps {
  product?: ProductData | null;
  categories: {id: string, name: string}[];
  onSave: (product: any) => void;
  onCancel: () => void;
  onImageUpload: (file: File) => Promise<string | null>;
  uploadingImage: boolean;
}

export default function ProductForm({ product, categories, onSave, onCancel, onImageUpload, uploadingImage }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    original_price: product?.original_price || 0,
    category_id: product?.category_id || (categories[0]?.id || ''),
    image: product?.image || '',
    discount: product?.discount || 0,
    is_new: product?.is_new || false,
    stock: product?.stock ?? 100,
    featured: product?.featured || false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price) || 0,
      original_price: Number(formData.original_price) || 0,
      stock: Number(formData.stock) || 100,
      discount: Number(formData.discount) || 0,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await onImageUpload(file);
      if (url) setFormData(prev => ({ ...prev, image: url }));
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Product Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Price (₹)</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value as any})} required />
          </div>
          <div className={styles.formGroup}>
            <label>Original Price (₹)</label>
            <input type="number" value={formData.original_price} onChange={(e) => setFormData({...formData, original_price: e.target.value as any})} />
          </div>
          <div className={styles.formGroup}>
            <label>Stock Quantity</label>
            <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value as any})} />
          </div>
          <div className={styles.formGroup}>
            <label>Discount (%)</label>
            <input type="number" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value as any})} />
          </div>

          {/* Image section */}
          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label>Product Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {formData.image && (
                <Image src={formData.image} alt="Preview" width={80} height={80} unoptimized style={{ borderRadius: '8px', objectFit: 'cover' }} />
              )}
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Paste image URL..."
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  style={{ marginBottom: '0.5rem' }}
                />
                <button type="button" className={styles.editBtn} onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                  {uploadingImage ? 'Uploading...' : '↑ Upload Image'}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            </div>
          </div>

          <div className={styles.formCheckbox}>
            <input type="checkbox" id="is_new" checked={formData.is_new} onChange={(e) => setFormData({...formData, is_new: e.target.checked})} />
            <label htmlFor="is_new">New Arrival</label>
          </div>
          <div className={styles.formCheckbox}>
            <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} />
            <label htmlFor="featured">Featured Product</label>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={uploadingImage}>Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

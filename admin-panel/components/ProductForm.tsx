'use client';

import React, { useState } from 'react';
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
}

interface ProductFormProps {
  product?: any | null;
  categories: {id: string, name: string}[];
  onSave: (product: ProductData) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, categories, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<any>({
    name: product?.name || '',
    price: product?.price || '',
    original_price: product?.original_price || '',
    category_id: product?.category_id || (categories[0]?.id || ''),
    image: product?.image || '',
    discount: product?.discount || 0,
    is_new: product?.is_new || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Product Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select 
              value={formData.category_id} 
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Price (₹)</label>
            <input 
              type="number" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Original Price (₹)</label>
            <input 
              type="number" 
              value={formData.original_price} 
              onChange={(e) => setFormData({...formData, original_price: e.target.value})} 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input 
              type="text" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Discount (%)</label>
            <input 
              type="number" 
              value={formData.discount} 
              onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value) || 0})} 
            />
          </div>
          <div className={styles.formCheckbox}>
            <input 
              type="checkbox" 
              id="is_new"
              checked={formData.is_new} 
              onChange={(e) => setFormData({...formData, is_new: e.target.checked})} 
            />
            <label htmlFor="is_new">New Arrival</label>
          </div>
          <div className={styles.formActions}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import styles from './CategoryBar.module.css';

const categories = [
  { name: "For You", image: "/medias/product_img1.71b51935.png" },
  { name: "Fashion", image: "/medias/product_img4.60bc85fd.png" },
  { name: "Mobiles", image: "/medias/product_img8.db630d17.png" },
  { name: "Beauty", image: "/medias/product_img11.db745a27.png" },
  { name: "Electronics", image: "/medias/product_img6.51b328b9.png" },
  { name: "Home", image: "/medias/product_img2.a1c97737.png" },
  { name: "Appliances", image: "/medias/product_img10.019edc7f.png" },
  { name: "Toys", image: "/medias/product_img12.bf22f7ab.png" }
];

const CategoryBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.scrollContainer}`}>
        {categories.map((cat, i) => (
          <button key={cat.name} className={styles.catItem}>
            <div className={styles.imageContainer}>
              <img src={cat.image} alt={cat.name} className={styles.catImage} />
            </div>
            <span className={styles.catName}>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;

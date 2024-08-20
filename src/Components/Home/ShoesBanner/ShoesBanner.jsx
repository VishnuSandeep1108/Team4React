import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./ShoesBanner.module.css";

function ShoesBanner() {
  return (
    <div className={styles[`shoes-banner`]}>
      <div className={styles[`shoes-banner-left`]}>
        <h1>black sneakers, so classy!</h1>

        <div className={styles[`edgtf-separator`]}>
            <svg x="0px" y="0px" width="65px" height="3px" viewBox="0 0 65 3" enable-background="new 0 0 65 3" xmlSpace="preserve">
            <g>
            <polygon className={styles[`edgtf-polygon edgtf-polygon-1`]} points="0,0 16.021,0 12.958,3 0,3 " fill='white'></polygon>
            <polygon className={styles[`edgtf-polygon edgtf-polygon-2`]} points="16.268,3 19.299,0 29.562,0 26.5,3 " fill='white'></polygon>
            <polygon className={styles[`edgtf-polygon edgtf-polygon-3`]} points="29.969,3 33,0 40,0 37.031,3 " fill='white'></polygon>
            <polyline className={styles[`edgtf-polygon edgtf-polygon-4`]} points="41.031,3 44,0 49.031,0 46.031,3 " fill='white'></polyline>
            <polygon className={styles[`edgtf-polygon edgtf-polygon-5`]} points="50.969,3 54.031,0 58.031,0 55,3 " fill='white'></polygon>
            <polygon className={styles[`edgtf-polygon edgtf-polygon-6`]} points="59.96,3 62.96,0 65,0 61.992,3 " fill='white'></polygon>
            </g>
            </svg>
          </div>

        <p>Walk the Walk with Timeless Elegance!</p>
      
        <Link to={"/footwear"} style={{fontSize:"2em"}} className={styles[`shoes-banner-button`]}>
          <span className={styles[`top-border`]}></span>
          <span>Shop Now!</span>
          <span className={styles[`bottom-border`]}></span>
        </Link>
      </div>
      <div className={styles[`shoes-banner-right`]}>
        <img className={styles[`shoes-banner-right-image`]} src='./Home-Images/shoes-banner.png'></img>
      </div>
    </div>
  )
}

export default ShoesBanner;

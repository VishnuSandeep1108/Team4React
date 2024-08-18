import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Posters.module.css";

function Posters() {

  return (
    <div className={styles[`posters`]}>
      <Link to={"/mens"} className={styles[`poster1`]}>
        <img className={styles[`poster-img`]} src='./Home-Images/poster1.jpg' />
        <div className={styles[`poster1-text`]}>
          <p style={{marginBottom:'0px'}}>Dresses to be noticed.</p>
          <h1>Make people fall in love with your clothes.</h1>
          <p>We provide clothes more than just stitched fabric.</p>
          <div style={{"lineHeight":"0.6"}}>
            <p>Pants</p>
            <p>Shirts</p>
            <p>Shorts</p>
            <p>Sweatshirts & Hoodies</p>
            <p>T-Shirts</p>
          </div>
          <p style={{"textDecoration":"underline"}}>Shop Now</p>
        </div>
      </Link>

      <Link to={"/womens"} className={styles[`poster2`]}>
        <img className={styles[`poster-img`]} src='./Home-Images/poster2.jpg' />
        <div className={styles[`poster2-text`]}>
          <h1>Believe in yourself.</h1>
          <p>Shopping is cheaper than a psychiatrist.</p>
          <p style={{"textDecoration":"underline"}}>Shop Now</p>
        </div>
      </Link>
      
      <Link to={"/womens"} className={styles[`poster3`]}>
        <img className={styles[`poster-img`]} src='./Home-Images/poster3.jpg' />
        <div className={styles[`poster3-text`]}>
          <h1>Be my fashionista.</h1>
          <p>Shopping is cheaper than a psychiatrist.</p>
          <p style={{"textDecoration":"underline"}}>Shop Now</p>
        </div>
      </Link>

      <Link to={"/new-arrivals"} className={styles[`poster4`]}>
        <img className={styles[`poster-img`]} src='./Home-Images/poster4.jpg' />
        <div className={styles[`poster4-text`]}>
          <p style={{"marginBottom": "0px"}}>Fashioning You!</p>
          <h1>Slay the world with the best outfits</h1>
          <p>Cool clothes are your body foundation</p>
          <p style={{"textDecoration":"underline"}}>Shop Now</p>
        </div>
      </Link>
    </div>
  )
}

export default Posters;

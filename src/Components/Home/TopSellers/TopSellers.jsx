import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import styles from "./TopSellers.module.css";

import { CategoryContext } from '../../../App';
import { ProductIdContext } from '../../../App';

function TopSellers() {
    const {category, setCategory} = useContext(CategoryContext);
    const {productId, setProductId} = useContext(ProductIdContext);

    const [topSellers, setTopSellers] = useState(null);

    const [startIndex, setStartIndex] = useState(0);

    useEffect(()=>{       
        console.log("URL: ",`http://localhost:8000/${category}`);
        
        axios.get(`http://localhost:8000/${category}`).then((topSellers)=>{     
            console.log(topSellers);
            console.log(topSellers.data);
    
            setTopSellers(topSellers.data);
            setStartIndex(0);
        })
    },[category])


    useEffect(() => {
      console.log("URL: ", `http://localhost:8000/${category}`);
      
      axios.get(`http://localhost:8000/${category}`).then((topSellers) => {     
          console.log(topSellers);
          console.log(topSellers.data);
  
          setTopSellers(topSellers.data);
          setStartIndex(0);
      });
  }, [category]);

  useEffect(() => {
      const separator = document.querySelector(`.${styles['edgtf-separator']}`);
      const polygons = document.querySelectorAll(`.${styles['edgtf-polygon']}`);

      function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
      }

      function checkScroll() {
        // console.log("TOPS sart");
        // console.log(separator);
        
        
          if (isInViewport(separator)) {
              separator.classList.add(styles['animate']);
              window.removeEventListener('scroll', checkScroll);
          }
      }

      window.addEventListener('scroll', checkScroll);
      checkScroll();

      return () => {
          window.removeEventListener('scroll', checkScroll);
      };
  }, []);




  return (
    <div className={styles[`top-sellers`]}>
          <h1>Top Sellers</h1>
          
          
          <div className={styles[`edgtf-separator`]}>
          <svg x="0px" y="0px" width="65px" height="3px" viewBox="0 0 65 3" enable-background="new 0 0 65 3" xmlSpace="preserve">
          <g>
          <polygon className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-1`]}`} points="0,0 16.021,0 12.958,3 0,3 "></polygon>
          <polygon className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-2`]}`} points="16.268,3 19.299,0 29.562,0 26.5,3 "></polygon>
          <polygon className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-3`]}`} points="29.969,3 33,0 40,0 37.031,3 "></polygon>
         <polyline className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-4`]}`} points="41.031,3 44,0 49.031,0 46.031,3 "></polyline>
          <polygon className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-5`]}`} points="50.969,3 54.031,0 58.031,0 55,3 "></polygon>
          <polygon className={`${styles[`edgtf-polygon`]} ${styles[`edgtf-polygon-6`]}`} points="59.96,3 62.96,0 65,0 61.992,3 "></polygon>
          </g>
          </svg>
          </div>


          <div className={styles[`categories-list`]}>
            <a onClick={()=>{setCategory("mens")}} className={styles[`top-sellers-categories`]}>
              <span className={styles[`top-border`]}></span>
              <span>Men</span>
              <span className={styles[`bottom-border`]}></span>
            </a>
            <a onClick={()=>{setCategory("womens")}} className={styles[`top-sellers-categories`]}>
              <span className={styles[`top-border`]}></span>
              <span>Women</span>
              <span className={styles[`bottom-border`]}></span>
            </a>
            <a onClick={()=>{setCategory("kids")}} className={styles[`top-sellers-categories`]}>
            <span className={styles[`top-border`]}></span>
              <span>Kids</span>
              <span className={styles[`bottom-border`]}></span>
            </a>
            <a onClick={()=>{setCategory("mens-footwear")}} className={styles[`top-sellers-categories`]}>
            <span className={styles[`top-border`]}></span>
              <span>Footwear</span>
              <span className={styles[`bottom-border`]}></span>
            </a>
          </div>

          <div className={styles[`top-sellers-carousel`]}>
            {topSellers && topSellers.slice(startIndex,startIndex+4).map((topSeller)=>{
                return (
                    <Link to="/product-details" onClick={()=>{setProductId(topSeller.id)}} className={styles[`top-seller`]}>
                        <img src={topSeller.images[0]} />
                        <div className={styles[`top-seller-details`]}>
                            <h3>{topSeller.title}</h3>
                            <h3>{topSeller.brand}</h3>
                            <i data-star={topSeller.rating}></i>
                        </div>
                    </Link>
                )
            })}

            <FaArrowLeft style={{fontSize: "3.5em"}} className={styles[`top-sellers-carousel-left-arrow`]} onClick={()=>{
              setStartIndex((prevValue)=>{
                if(prevValue>=4)
                  return (startIndex-4);
                else
                  return 0;
              });
            }}/>
            <FaArrowRight style={{fontSize: "3.5em"}} className={styles[`top-sellers-carousel-right-arrow`]} onClick={()=>{
              setStartIndex((prevValue)=>{
                if(prevValue<topSellers.length-4)
                  return (startIndex+4);
                else
                  return 0;                  
              })
                
            }}/>
          </div>
    </div>
  )
}

export default TopSellers;

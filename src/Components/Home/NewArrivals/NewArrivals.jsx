import React,{useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

import styles from "./NewArrivals.module.css";

function NewArrivals() {

  useEffect(()=>{
    let separator = null;
    separator = document.querySelector('.edgtf-separator');
    const polygons = document.querySelectorAll('.edgtf-polygon');

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
        if (separator && isInViewport(separator)) {
            separator.classList.add('animate');
            window.removeEventListener('scroll', checkScroll);
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  },[])

  return (
    <div className={styles[`new-arrivals`]}>
      <div className={styles[`new-arrivals-left`]}></div>
      <div className={styles[`new-arrivals-right`]}>
        
        <div className={styles[`new-arrivals-right-text`]}>
            <h3>New Season Styles</h3>

            <div className={styles[`edgtf-separator`]}>
              <svg x="0px" y="0px" width="65px" height="3px" viewBox="0 0 65 3" enable-background="new 0 0 65 3" xmlSpace="preserve">
              <g>
              <polygon className={styles[`edgtf-polygon edgtf-polygon-1`]} points="0,0 16.021,0 12.958,3 0,3 "></polygon>
              <polygon className={styles[`edgtf-polygon edgtf-polygon-2`]} points="16.268,3 19.299,0 29.562,0 26.5,3 "></polygon>
              <polygon className={styles[`edgtf-polygon edgtf-polygon-3`]} points="29.969,3 33,0 40,0 37.031,3 "></polygon>
             <polyline className={styles[`edgtf-polygon edgtf-polygon-4`]} points="41.031,3 44,0 49.031,0 46.031,3 "></polyline>
              <polygon className={styles[`edgtf-polygon edgtf-polygon-5`]} points="50.969,3 54.031,0 58.031,0 55,3 "></polygon>
              <polygon className={styles[`edgtf-polygon edgtf-polygon-6`]} points="59.96,3 62.96,0 65,0 61.992,3 "></polygon>
              </g>
              </svg>
            </div>

            <h5>Fresh Threads for Fresh Vibes! Check Out What's New!</h5>

            <Link to={"/new-arrivals"} className={styles[`new-arrivals-button`]}>
              <span className={styles[`top-border`]}></span>
              <span>Take a Peek!</span>
              <span className={styles[`bottom-border`]}></span>
            </Link>

        </div>

      </div>
    </div>
  )
}

export default NewArrivals;

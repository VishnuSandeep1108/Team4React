import React from 'react';
import  styles from "./Footer.module.css";
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaAppStoreIos, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className={styles[`footer-left`]}>
        <h2 className={`navbar-brand ${styles[`navbar-brand`]}`}>FAshioneeRS!</h2>
        <p>The Pioneers of Modern Fashion</p>
        <br />
        <p className={styles[`footer-left-text`]}>
          Enjoy the hassle-free experience as you shop comfortably from your home or your workplace. You can also shop for your friends, family and loved-ones and avail our gift services for special occasions.
        </p>
      </div>
      <div className={styles[`footer-center`]}>
        <h6>Experience Fashioneers</h6>
          <FaGooglePlay className="fa-xl icons" />
          &nbsp; <p>Get it on Google Play</p>
          <br />
          <br />
          <FaAppStoreIos className="fa-xl icons" />
          &nbsp;<p>Download on App Store</p>
        <br />
        <h6>Keep in touch</h6>
          <FaFacebook style={{"marginRight": "10px"}} className="fa-xl icons" />
          <FaTwitter style={{"marginRight": "10px"}} className="fa-xl icons" />
          <FaYoutube  style={{"marginRight": "10px"}}className="fa-xl icons" />
          <FaInstagram style={{"marginRight": "10px"}} className="fa-xl icons" />
    </div>
    <div className={styles[`footer-right`]}>
      <ul>
        <h6>Online Shopping</h6>
        <li><Link className={styles[`footer-right-text`]} to="/mens">Men</Link></li>
        <li><Link className={styles[`footer-right-text`]} to="/women">Women</Link></li>
        <li><Link className={styles[`footer-right-text`]} to="/kids">Kids</Link></li>
        <li><Link className={styles[`footer-right-text`]} to="/footwear">Footwear</Link></li>
      </ul>

      <ul>
        <h6>Customer Policies</h6>
        <li><a className={styles[`footer-right-text`]} href="#">Contact Us</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">FAQ</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">T&C</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Terms of Use</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Track Orders</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Shipping</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Cancellation</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Returns</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Privacy Policy</a></li>
        <li><a className={styles[`footer-right-text`]} href="#">Grievance Officer</a></li>
      </ul>
        </div>
    </footer>
  );
};

export default Footer;

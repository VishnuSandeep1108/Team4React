import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faHeart, faCartShopping, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
  import {UserContext} from "../../App";

import styles from "./Header.module.css";

const Header = () => {
  const {username, setUsername} = useContext(UserContext);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loginBtnDisplay, setLoginBtnDisplay] = useState(true);
  const navigate = useNavigate();
  const [isMenHovered, setIsMenHovered] = useState(false);
const [isWomenHovered, setIsWomenHovered] = useState(false);
const [isKidsHovered, setIsKidsHovered] = useState(false);
const [isFootewearHoverd ,setIsFootwearHovered] =useState(false);
// const[username ,setUsername]=useState('John');

  const [searchQuery, setSearchQuery] = useState('');


  const onAuthHandler = () => {
    navigate('/auth');
  };

  const onLogout = () => {
    navigate('/auth');
  };

  function onWishlistClick(){
    console.log("USERNAME: ",username);
    
    if(username)
      navigate("/wishlist");
    else
      navigate("/auth");
  }

  function onCartClick()
  {
    console.log("USERNAME: ",username);

    if(username)
      navigate("/cart");
    else
      navigate("/auth");
  }
  useEffect(() =>{
      axios.get(`http://localhost:8000/users?username=${username}`).then((userDetails)=>{
        console.log(userDetails.data);
        
        let temp = [];
        userDetails.data.map((user)=>{
              if(user.username == username){
                setWishlistCount(user.wishlist.length);
                let cartTotal=0;
                user.cart.map((cartItem)=>{
                  cartTotal+=cartItem.itemCount;
                })
                setCartCount(cartTotal);
              }
        })
      })
  }) 

  return (
    <nav className={`navbar navbar-expand-xl ${styles[`navbar`]}`}>
      <div className={`container-fluid ${styles[`container-fluid`]}`}>
        <Link className={`navbar-brand ${styles[`navbar-brand`]}`} to="/">
          FAshioneers
        </Link>
        <button
          className={`navbar-toggler ${styles[`navbar-toggler`]}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles[`navbar-toggler-icon`]}`}></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles[`navbar-nav`]}`}>
            <li className={`nav-item ${styles[`nav-item`]}`}
             onMouseEnter={() => setIsMenHovered(true)}
             onMouseLeave={() => setIsMenHovered(false)}>
              
              <Link className={`nav-link ${styles[`nav-link`]}`} to="/men">
                MEN
              </Link>
              {isMenHovered && (
                <div className={` dropdown-menu ${styles[`dropdown-menu`]}`}>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/tops">Tops</Link>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/bottoms">Bottoms</Link>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/accessories">Accessories</Link>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/tops">Tops</Link>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/bottoms">Bottoms</Link>
               <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/mens/accessories">Accessories</Link>
    </div>
  )}
            </li>
            <li className={`nav-item ${styles[`nav-item`]}`}
             onMouseEnter={() => setIsWomenHovered(true)}
             onMouseLeave={() => setIsWomenHovered(false)}>
              <Link className={`nav-link ${styles[`nav-link`]}`} to="/women">
                Women
              </Link>
              {isWomenHovered && (
                   <div className={` dropdown-menu ${styles[`dropdown-menu`]}`}>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/tops">Tops</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/bottoms">Bottoms</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/accessories">Accessories</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/tops">Tops</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/bottoms">Bottoms</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/womens/accessories">Accessories</Link>
       </div>
              )}
            
            </li>
            <li className={styles[`nav-item`]}
             onMouseEnter={() => setIsKidsHovered(true)}
             onMouseLeave={() => setIsKidsHovered(false)}>
              <Link className={`nav-link ${styles[`nav-link`]}`} to="/kids">
                Kids
              </Link>
              {
                isKidsHovered && (
                  <div  className={` dropdown-menu ${styles[`dropdown-menu`]}`}>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kidss/tops">Tops</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kids/bottoms">Bottoms</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kids/accessories">Accessories</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kidss/tops">Tops</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kids/bottoms">Bottoms</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Kids/accessories">Accessories</Link>
       </div>
                )
              }
            
            </li>
            <li className={`nav-item ${styles[`nav-item`]}`}
             onMouseEnter={() =>setIsFootwearHovered(true)}
             onMouseLeave={() => setIsFootwearHovered(false)}>
              <Link className={`nav-link ${styles[`nav-link`]}`} to="/footwear">
                Footwear
              </Link>
              {
              isFootewearHoverd &&
                (
                  <div  className={` dropdown-menu ${styles[`dropdown-menu`]}`}>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Shoes">Shoes</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Sneakers">Sneakers</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Slippers">Slippers</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Shoes">Shoes</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Sneakers">Sneakers</Link>
                  <Link className={` dropdown-item ${styles[`dropdown-item`]}`} to="/Footwear/Slippers">Slippers</Link>
       </div>
                )
              }
            
            </li>
            <li className={`nav-item nav-icon ${styles[`nav-item`]} ${styles[`nav-icon`]}`} onClick={()=>{onWishlistClick()}}>
              <li className={`nav-link ${styles[`nav-link`]}`} onClick={()=>{onWishlistClick()}}>
                <FontAwesomeIcon icon={faHeart} size="lg" /> {wishlistCount}
              </li>
            </li>
            <li className={`nav-item nav-icon ${styles[`nav-item`]} ${styles[`nav-icon`]}`} onClick={()=>{onCartClick()}}>
              <li className={`nav-link ${styles[`nav-link`]}`} onClick={()=>{onCartClick()}}>
                <FontAwesomeIcon icon={faCartShopping} size="lg" /> {cartCount}
              </li>
            </li>
            {loginBtnDisplay ? (
              <li className={`nav-item nav-icon ${styles[`nav-item`]} ${styles[`nav-icon`]}`}>
                <Link className={`nav-link ${styles[`nav-link`]}`} onClick={onAuthHandler} to="/auth">
                  <FontAwesomeIcon icon={faRightToBracket} size="lg" />
                </Link>
              </li>
            ) : (
              <li className={`nav-item nav-icon ${styles[`nav-item`]}`}>
                <Link className={`nav-link ${styles[`nav-link`]}`} onClick={onLogout} to="/auth">
                  <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState, useEffect, useContext } from 'react';
import styles from "./Mens.module.css";
import axios from 'axios';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import {CategoryContext} from "../../App";
import {ProductIdContext} from "../../App";
import {UserContext} from "../../App";


import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Mens() {
  const navigate = useNavigate();
  const {username, setUsername} = useContext(UserContext);
  const {category, setCategory} = useContext(CategoryContext);
  const {productId, setProductId} = useContext(ProductIdContext);
  const [mens, setMens] = useState([]);
  // const [username, setUsername] = useState("John");
  const [loading, setLoading] = useState(true);

  const [already, setAlready] = useState(false);
  const [wishMsg, setWishMsg] = useState(false);
  const [cartMsg, setCartMsg] = useState(false);
  const [searche,hhh]=useState('');
  const [searchee,setSearch]=useState(['clothing','mens-shirts','womens-dresses','womens-shoes','footwear','mens-shoes',''])
  const [defaultOrder, setDefaultOrder] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
    axios.get('http://localhost:8000/mens').then((res) => {
      setMens(res.data);
      setDefaultOrder(res.data);
    });

    window.scrollTo(0, 0);
  }, [username]);

  const onAddCart = (product) => {
    window.scrollTo(0, 0)
    console.log(username);
    let flag = false;

    if (username) {
      console.log("VALID");

      axios.get(`http://localhost:8000/users?username=${username}`).then((user) => {

        user.data[0].cart.forEach((item) => {
          if (item.id === product.id) {
            item.itemCount++;
            flag = true;
            return;
          }
        });

        if (!flag) {
          user.data[0].cart.push(product);
        }
        
        axios.put(`http://localhost:8000/users/${user.data[0].id}`, user.data[0]).then(()=>{
          setCartMsg(true);
          setWishMsg(false);
          setAlready(false);
            setTimeout(()=>{
              setCartMsg(false);
            },3000);
            // alert("Added to Cart!")
        });
      });
    }
    else
    {
      navigate("/auth");
    }
  };

  const onAddWishlist = (product) => {
    window.scrollTo(0, 0)
    console.log(username);
    let flag = false;

    if (username) {
      console.log("VALID");

      axios.get(`http://localhost:8000/users?username=${username}`).then((user) => {        
        user.data[0].wishlist.forEach((item) => {
          if (item.id === product.id) {
            flag = true;
            setAlready(true);
            setCartMsg(false);
            setWishMsg(false);
            setTimeout(()=>{
              setAlready(false);
            },3000)
            // alert("Already Wishlisted!");
            return;
          }
        });

        if (!flag) {
          user.data[0].wishlist.push(product);
          setWishMsg(true);
          setAlready(false);
          setCartMsg(false);
            setTimeout(()=>{
              setWishMsg(false);
            },3000)
          // alert("Wishlisted Successfully!");
        }

        axios.put(`http://localhost:8000/users/${user.data[0].id}`, user.data[0]);
      });
    }
    else
    {
      navigate("/auth");
    }
  };

  const search=(event)=>{
    const id=event.target.value
    console.log("ID: ",id);
    
  let flag=false
    for(let i of searchee){
   
        if (id===i.substring(0,id.length)){
            hhh(i)
            console.log("I: ",i);
            
            flag=true
        }
        console.log(i.substring(0,id.length))
        console.log(id)
    }
    if(!flag){
        hhh('Not Found')
    }
}

const handleSortChange = (event) => {
  const value = event.target.value;
  if (value === "lower") {
    priceLowerCmp();
  } else if (value === "higher") {
    priceHigherCmp();
  }
}

function lowerCmp(a,b)
    {
      return a.price - b.price;
    }

    function priceLowerCmp()
    {
      let temp = [...mens];
      console.log("TEMP BEFORE: ",temp);
      
      temp.sort(lowerCmp);
      console.log("TEMP AFTER: ",temp);
      

      setMens(temp);
    }

    function higherCmp(a,b)
    {
      return b.price-a.price;
    }

    function priceHigherCmp()
    {
      let temp = [...mens];
      temp.sort(lowerCmp);
      setMens(temp);
    }

  return (
    <>
      <Header />
      {already ? <p className={styles[`revealed-message`]}>Already Wishlisted!<div className={styles[`green-bottom`]}></div></p>:(null)}
      {wishMsg ? <p className={styles[`revealed-message`]}>Wishlisted Successfully!<div className={styles[`green-bottom`]}></div></p>:(null)}
      {cartMsg ? <p className={styles[`revealed-message`]}>Added to Cart Successfully!<div className={styles[`green-bottom`]}></div></p>:(null)}
      {/* <p className={styles[`revealed-message`]}> <div className={styles[`green-bottom`]}></div></p>
      <p className={styles[`revealed-message`]}> <div className={styles[`green-bottom`]}></div></p> */}
      

    <div className={styles[`product-display`]}>
      {loading && (
        <div className={styles[`loading-spinner`]}>
          <div className={`${styles[`page-content`]} ${styles[`page-container`]}`} id="page-content">
            <div className={styles[`padding`]}>
              <div class={`row container d-flex justify-content-center`}>
                <div class={`col-md-4 col-sm-6 grid-margin stretch-card`}>
                  <div class={styles[`loader-demo-box`]}>
                    <div class={styles[`jumping-dots-loader`]}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1>Men's Collection</h1>
      {/* <label for="sortby">Sort By</label>
      <select id='sortby' onChange={handleSortChange}>
          <option value="relevant" selected="selected">Most Relevant</option>
          <option value="lower">Price : Lower to Higher</option>
          <option value="higher">Price : Higher to Lower</option>
        </select> */}
      {/* <span className={styles[`bottom-border`]}></span> <input type='text' className='styled-input' onChange={(event)=>{search(event)}}></input> */}
      <div className={styles[`product-display-container`]}>
        {mens.map(product => (
          <div className={`card ${styles[`card`]}`} key={product.id}>
            <Link onClick={()=>{setCategory("mens"); setProductId(product.id)}} to={"/product-details"}>
            <img
              className={`card-img-top`}
              src={product.images[0]}
              alt={product.title}
            /></Link>
            <div className={`card-body ${styles[`productDetails`]} ${styles[`card-body`]}`}>
              <h4 className={`card-title ${styles[`cardTitle`]} ${styles[`card-title`]}`}>{product.title}</h4>
              <p className={`card-text ${styles[`cardText`]} ${styles[`card-text`]}`}>{product.brand}</p>
              <p className={`card-text ${styles[`cardText`]} ${styles[`card-text`]}`}>
                Rs. {product.price} <span className={styles[`strikedPrice`]}><del>Rs. 1499</del></span> (68% off)
              </p>
            </div>
            <div className={`card-body ${styles[`wishlist`]} ${styles[`card-body`]}`}>
              <a className={styles[`top-sellers-categories`]} onClick={() => { onAddWishlist(product) }}>
                <span className={styles[`top-border`]}></span>
                <span><i className="fa-solid fa-heart"></i> Wishlist</span>
                <span className={styles[`bottom-border`]}></span>
              </a>

              <a className={styles[`top-sellers-categories`]} onClick={() => { onAddCart(product) }}>
                <span className={styles[`top-border`]}></span>
                <span><i className="fa-solid fa-cart-shopping"></i> Add to Cart</span>
                <span className={styles[`bottom-border`]}></span>
              </a>
              <p style={{fontSize: "0.9em", "margin": "0 auto"}} className={`card-text ${styles[`card-text`]}`}>Size: S</p>
              <p style={{fontSize: "0.9em", "margin": "0 auto"}} className={`card-text ${styles[`card-text`]}`}>
                Rs. {product.price} <span className={styles[`strikedPrice`]}><del>Rs. 1499</del></span> (68% off)
              </p>
            </div>
          </div>
        ))}
      </div>

      <div><p></p></div>
    </div>

    <Footer />
    </>
  );
}

export default Mens;
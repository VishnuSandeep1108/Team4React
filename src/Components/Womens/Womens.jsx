import React, { useState, useEffect, useContext } from 'react';
import styles from "./Womens.module.css";
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import {CategoryContext} from "../../App";
import {ProductIdContext} from "../../App";
import {UserContext} from "../../App";


import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Womens() {
  const navigate = useNavigate();
  const {username, setUsername} = useContext(UserContext);
    const [womens, setWomens] = useState([]);
    const {category, setCategory} = useContext(CategoryContext);
  const {productId, setProductId} = useContext(ProductIdContext);

  const [already, setAlready] = useState(false);
  const [wishMsg, setWishMsg] = useState(false);
  const [cartMsg, setCartMsg] = useState(false);
    

    // const [username, setUsername] = useState(["John"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
      axios.get('http://localhost:8000/womens').then((res) => {
        setWomens(res.data);
      });
  
      window.scrollTo(0, 0)
  
    }, [username]);
    // const [cart, setCart] = useState([]);
    // useEffect(() => {

    //     axios.get(`http://localhost:8000/users?username=${username}`).then((res) => {            
    //       setCart(res.data[0].cart);
    //     });
    // }, []);

    //   const [wishlist, setWishlist] = useState([]);
    // useEffect(() => {

    //     axios.get(`http://localhost:8000/users?username=${username}`).then((res) => {            
    //       setWishlist(res.data[0].wishlist);
    //     });
    // }, []);

    const onAddCart = (product) =>
        {
          window.scrollTo(0, 0);
         console.log(username);
         let flag=false;
         
         if(username)
           {
             console.log("VALID");
             
             axios.get(`http://localhost:8000/users?username=${username}`).then((user)=>{
                     
               user.data[0].cart.forEach((item)=>{
                 if(item.id === product.id)
                 {
                   item.itemCount++;
                   flag = true;
                   return;
                 }
               })
     
               if(flag === false)
               {
                 user.data[0].cart.push(product);
               }
               
               axios.put(`http://localhost:8000/users/${user.data[0].id}`,user.data[0]).then(()=>{
                // alert("Added to Cart Successfully!");
                setCartMsg(true);
                setWishMsg(false);
                setAlready(false);
                  setTimeout(()=>{
                    setCartMsg(false);
                  },3000);
               })
             })
           }

           else
           {
              navigate("/auth");
           }
         }

    const onAddWishlist = (product) =>
   {
    window.scrollTo(0, 0);
    console.log(username);
    let flag=false;
    
    if(username)
      {
        console.log("VALID");
        
        axios.get(`http://localhost:8000/users?username=${username}`).then((user)=>{
                
          user.data[0].wishlist.forEach((item)=>{
            if(item.id === product.id)
            {
              flag = true;
              // alert("Already Wishlisted")
              setAlready(true);
            setCartMsg(false);
            setWishMsg(false);
            setTimeout(()=>{
              setAlready(false);
            },3000)
              return;
            }
          })

          if(flag === false)
          {
            user.data[0].wishlist.push(product);
            axios.put(`http://localhost:8000/users/${user.data[0].id}`,user.data[0]).then(
              // console.log(wishlist),
              // alert("Wishlisted Successfully!")
              ()=>{
                setWishMsg(true);
          setAlready(false);
          setCartMsg(false);
            setTimeout(()=>{
              setWishMsg(false);
            },3000)
              }
            )
          }
          
          
        })
      }

      else
      {
        navigate("/auth");
      }
   }
   
  return (
    <>
    <Header />
    {already ? <p className={styles[`revealed-message`]}>Already Wishlisted!<div className={styles[`green-bottom`]}></div></p>:(null)}
      {wishMsg ? <p className={styles[`revealed-message`]}>Wishlisted Successfully!<div className={styles[`green-bottom`]}></div></p>:(null)}
      {cartMsg ? <p className={styles[`revealed-message`]}>Added to Cart Successfully!<div className={styles[`green-bottom`]}></div></p>:(null)}

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
  <h1>Women's Collection</h1>
  <div className={styles[`product-display-container`]}>
  {womens.map(product=>(
 
    
  
 <div className={`card ${styles[`card`]}`} key={product.id}>
      <Link onClick={()=>{setCategory("womens"); setProductId(product.id)}} to={"/product-details"}>
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

          )
}

export default Womens

import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


import styles from "./Product-Details.module.css";

import { FaChevronLeft,FaChevronRight } from 'react-icons/fa6';

import { CategoryContext } from '../../App';
import { ProductIdContext } from '../../App';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navigate } from 'react-router-dom';
import {UserContext} from "../../App";


function ProductDetails() {
    const navigate = useNavigate();
    const {username, setUsername} = useContext(UserContext);
const {category, setCategory} = useContext(CategoryContext);
const {productId, setProductId} = useContext(ProductIdContext);
const [productDetails, setProductDetails] = useState(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
const [relatedProducts, setRelatedProducts] = useState([]);
// const [username, setUsername] = useState("John");

const onAddCart = (product) =>
    {
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
           
           axios.put(`http://localhost:8000/users/${user.data[0].id}`,user.data[0]).then(
             alert("Added to Cart Successfully!")
           )
         })
       }
       else
       {
         navigate("/auth");
       }
     }

const onAddWishlist = (product) =>
{
console.log("USER: ",username);
let flag=false;

if(username)
  {
    console.log("VALID");
    
    axios.get(`http://localhost:8000/users?username=${username}`).then((user)=>{
            
      user.data[0].wishlist.forEach((item)=>{
        if(item.id === product.id)
        {
          flag = true;
          alert("Already Wishlisted")
          return;
        }
      })

      if(flag === false)
      {
        user.data[0].wishlist.push(product);
        axios.put(`http://localhost:8000/users/${user.data[0].id}`,user.data[0]).then(
          // console.log(wishlist),
          alert("Wishlisted Successfully!")
        )
      }
      
      
    })
  }

  else
  {
    navigate("/auth");
  }
}

useEffect(()=>{
    axios.get(`http://localhost:8000/${category}/${productId}`).then((fetchedDetails)=>{     
        setProductDetails(fetchedDetails.data);

        setRelatedProducts([]);

        fetchedDetails.data.relatedProducts.map((relatedProductId)=>{
            axios.get(`http://localhost:8000/${category}/${relatedProductId}`).then((relatedProduct)=>{
                setRelatedProducts(prevRelatedProducts => [...prevRelatedProducts, relatedProduct.data]);
            })
        })
    })

    let interval = setInterval(()=>{
        setCurrentReviewIndex((prevValue)=>{
            if(prevValue!=2)
                return prevValue+1;
            else
                return 0;
        })
    },5000)

    return (()=>{
        clearInterval(interval);
    })
},[productId])

  return (
    <>
    <Header />
    {productDetails ? (
        <div className={styles[`product-details-container`]}>
            <div className={styles[`product-display`]}>
                <div className={styles[`product-images`]}>
                    <img src={productDetails.images[currentImageIndex]}></img>
                    <FaChevronLeft onClick={()=>{setCurrentImageIndex((prevValue) => {
                        if(prevValue!=0)
                            return prevValue-1;
                        else
                            return 3;
                    })}} className={styles[`product-images-left-arrow`]} />
                    <FaChevronRight onClick={()=>{setCurrentImageIndex((prevValue) => {
                        if(prevValue!=3)
                            return prevValue+1;
                        else
                            return 0;
                    })}} className={styles[`product-images-right-arrow`]} />
                </div>
                <div className={styles[`product-details`]}>
                    <h1>{productDetails.title}</h1>
                    <h3>${Math.round(((100-productDetails.discountPercentage)*(productDetails.price))/100)} <span className={styles[`org-price`]}>${(productDetails.price)}</span> <span className={styles[`discount`]}>({productDetails.discountPercentage}% Off)</span></h3>
                    <p className={styles[`rating`]}><i data-star={productDetails.rating}></i></p>
                    <p className={styles[`description`]}>{productDetails.description}</p>
                    <a className={`${styles[`product-details-button`]} ${styles[`wishlist-button`]}`} onClick={()=>{onAddWishlist(productDetails)}}>
                        <span className={styles[`top-border`]}></span>
                        <span>Add to Wishlist</span>
                        <span className={styles[`bottom-border`]}></span>
                    </a>
                    <a className={`${styles[`product-details-button`]} ${styles[`cart-button`]}`} onClick={()=>{onAddCart(productDetails)}}>
                        <span className={styles[`top-border`]}></span>
                        <span>Add to Cart</span>
                        <span className={styles[`bottom-border`]}></span>
                    </a>
                    <p className={styles[`sku`]}>SKU: {productDetails.sku}</p>
                    <p className={styles[`category`]}>Category: {productDetails.category}</p>
                </div>
            </div>

            <div className={styles[`product-reviews`]}>
                <h3>Reviews</h3>
                {productDetails ? (
                    <div className={styles[`product-review`]}>
                        <div className={styles[`product-review-image`]}>
                            <img src='./ProductDetails-Images/user.png'/>
                        </div>
                        <div className={styles[`product-review-details`]}>
                            <i data-star={productDetails.reviews[currentReviewIndex].rating}></i>
                            <p>{productDetails.reviews[currentReviewIndex].reviewerName} - {productDetails.reviews[currentReviewIndex].date.substr(0,10)}</p>
                            <p>{productDetails.reviews[currentReviewIndex].comment}</p>
                        </div>
                    </div>
                ) : (
                    <h1>Fetching Reviews ...</h1>
                )}
            </div>

            <div className={styles[`related-products-container`]}>
                <h3>Related Products</h3>
                {relatedProducts ? (                    
                    <div className={styles[`related-products`]}>
                        {relatedProducts.map((relatedProduct)=>{                        
                        return (
                            <div onClick={()=>{setProductId(relatedProduct.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={styles[`related-product`]}>
                                <div className={styles[`related-product-image`]}>
                                    <img src={relatedProduct.images[0]} />
                                </div>

                                <div className={styles[`related-product-details`]}>
                                    <h3>{relatedProduct.title}</h3>
                                    <h3>{relatedProduct.brand}</h3>
                                    <i className={styles[`stars`]} data-star={relatedProduct.rating}></i>
                                    <h3>${Math.round(((100-relatedProduct.discountPercentage)*(relatedProduct.price))/100)} <span className={styles[`org-price`]}>${(relatedProduct.price)}</span> <span className={styles[`discount`]}>({relatedProduct.discountPercentage}% Off)</span></h3>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                ) : (
                    <h1>Fetching Related Products...</h1>
                )}
            </div>
        </div>
    ) : (
        <div className={styles[`loader`]}></div>
    )}
    <Footer />
    </>
  )
}

export default ProductDetails;

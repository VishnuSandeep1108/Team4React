import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUserCheck, FaUserGear } from 'react-icons/fa6';
import axios from 'axios';

import "./Product-Details.css";
import { FaUser, FaUserAlt, FaUserAltSlash, FaUserAstronaut, FaUserCircle } from 'react-icons/fa';

function ProductDetails() {

  const [productId,setProductId] = useState(84);
  const [category,setCategory] = useState("mens");

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(1);

  useEffect(()=>{
    let interval;
    axios.get(`http://localhost:8000/${category}/${productId}`).then((fetchedDetails)=>{     
      setProductDetails(fetchedDetails.data);
      console.log(fetchedDetails.data.reviews.length);


      let temp = [];
      fetchedDetails.data.relatedProducts.map((relatedProductId)=>{
        axios.get(`http://localhost:8000/${category}/${relatedProductId}`).then((fetchedRelatedProduct)=>{ 
          
          temp.push(fetchedRelatedProduct.data);         
        })
        
      })
      setRelatedProducts(temp);   


      
      interval =  setInterval(()=>{
        setReviewIndex((prevValue) => {
          if(prevValue!=fetchedDetails.data.reviews.length-1)
            return prevValue+1;
          else
            return 1;
        })   
      },5000)
    })

    return (()=>{
      clearInterval(interval);
    })
  },[productId])

  return (
    productDetails? <div className='product-details-container'>
    <div className='product-details-top'>
      <div className='product-details-top-left'>
        <div className='product-details-top-left-image'>
          <img src={productDetails.images[currentIndex]}></img>
          <h3 onClick={()=>{
            if(currentIndex!=0)
              setCurrentIndex(prevValue=>prevValue-1);
            else
              setCurrentIndex(3);
          }} className='product-details-left-arrow'>&lt;</h3>
          <h3 onClick={()=>{
            if(currentIndex!=3)
              setCurrentIndex(prevValue=>prevValue+1);
            else
              setCurrentIndex(0);
          }} className='product-details-right-arrow'>&gt;</h3>
          {/* <FaArrowRight className='product-details-right-arrow'/> */}
        </div>
      </div>
      <div className='product-details-top-right'>
        <div className='product-details-top-right-inner'>
          <h1>{productDetails.title}</h1>
          <h3>{productDetails.price}$</h3>
          <p className='rating'><i data-star={productDetails.rating}></i></p>
          <p className='description'>{productDetails.description}</p>
          <a className='product-details-button wishlist-button'>
            <span className='top-border'></span>
            <span>Add to Wishlist</span>
            <span className='bottom-border'></span>
          </a>
          <a className='product-details-button cart-button'>
            <span className='top-border'></span>
            <span>Add to Cart</span>
            <span className='bottom-border'></span>
          </a>

          <p className='sku'>SKU: {productDetails.sku}</p>
          <p className='category'>Category: {productDetails.category}</p>
          {/* <p className='brand'>Brand: {productDetails.brand}</p> */}
        </div>
      </div>
    </div>
    <div className='product-details-middle'>
      <h1>Reviews</h1>

          <div className='product-review'>
          {reviewIndex && (
            <div>
            <i data-star={productDetails.reviews[reviewIndex].rating}></i>
            <p>{productDetails.reviews[reviewIndex].reviewerName} - {productDetails.reviews[reviewIndex].date.substr(0,10)}</p>
            <p>{productDetails.reviews[reviewIndex].comment}</p>
          </div>)}
          </div>

    </div>
    <div className='product-details-bottom'>
      <h1>Related Products</h1>
      <div className='related-products'>
        {relatedProducts && relatedProducts.map((relatedProduct)=>{
          return (
            <div className='related-product-card'>
              <img className='related-product-image' src={relatedProduct.images[0]} />
              <div className='related-product-details'>
                  <h3>{relatedProduct.title}</h3>
                  <h3>{relatedProduct.brand}</h3>
                  <i data-star={relatedProduct.rating}></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>:<h1>Fetching </h1>
  )
}

export default ProductDetails;

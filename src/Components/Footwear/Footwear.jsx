import React, { useState, useEffect } from 'react';
import styles from "./Footwear.module.css";
import axios from 'axios';

function Footwear() {
    const [footwear, setFootwear] = useState([]);


    const [username, setUsername] = useState(["John"]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
    axios.get('http://localhost:8000/mens-footwear').then((res) => {
      setFootwear(res.data);
    });



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
         console.log(username);
         let flag=false;
         
         if(username!='')
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

        //    else
        //    {

        //    }
         }

    const onAddWishlist = (product) =>
   {
    console.log(username);
    let flag=false;
    
    if(username!='')
      {
        console.log("VALID");
        
        axios.get(`http://localhost:8000/users?username=${username}`).then((user)=>{
                
          user.data[0].wishlist.forEach((item)=>{
            if(item.id === product.id)
            {
              flag = true;
              return;
            }
          })

          if(flag === false)
          {
            user.data[0].wishlist.push(product);
          }
          
          axios.put(`http://localhost:8000/users/${user.data[0].id}`,user.data[0]).then(
            // console.log(wishlist),
            alert("Wishlisted Successfully!")
          )
        })
      }

    //   else
    //   {
    //     loginObs.onLoggingInHandler({refresh:false});
    //     router.navigate(['auth']);
    //   }
   }

  return (
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
  <h1>Footwear Collection</h1>
  <div className={styles[`product-display-container`]}>
  {footwear.map(product=>(
 
 <div className={`card ${styles[`card`]}`} key={product.id}>
 <img
   className={`card-img-top`}
   src={product.images[0]}
   alt={product.title}
 />
 <div className={`card-body ${styles[`productDetails`]} ${styles[`card-body`]}`}>
   <h4 className={`card-title ${styles[`cardTitle`]} ${styles[`card-title`]}`}>{product.title}</h4>
   <p className={`card-text ${styles[`cardText`]} ${styles[`card-text`]}`}>{product.brand}</p>
   <p className={`card-text ${styles[`cardText`]} ${styles[`card-text`]}`}>
     Rs. {product.price} <span className={styles[`strikedPrice`]}><del>Rs. 1499</del></span> (68% off)
   </p>
 </div>
 <div className={`card-body ${styles[`wishlist`]} ${styles[`card-body`]}`}>
   <a className={styles[`top-sellers-categories`]} onClick={(event) => { onAddWishlist(event, product) }}>
     <span className={styles[`top-border`]}></span>
     <span><i className="fa-solid fa-heart"></i> Wishlist</span>
     <span className={styles[`bottom-border`]}></span>
   </a>

   <a className={styles[`top-sellers-categories`]} onClick={(event) => { onAddCart(product) }}>
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

          )
}

export default Footwear

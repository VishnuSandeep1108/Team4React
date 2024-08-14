import React, { useState, useEffect } from 'react';
import './Womens.css';
import axios from 'axios';

function Womens() {
    const [womens, setWomens] = useState([]);
    useEffect(() => {

        axios.get(`http://localhost:8000/womens`).then((res) => {            
          setWomens(res.data);
        });
    }, []);

    const [username, setUsername] = useState(["John"]);

    const [cart, setCart] = useState([]);
    useEffect(() => {

        axios.get(`http://localhost:8000/users?username=${username}`).then((res) => {            
          setCart(res.data[0].cart);
        });
    }, []);

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
    <div className="product-display">
  <h1>Women's Collection</h1>
  <div className="product-display-container">
  {womens.map(product=>(
 
    
  
    <div className="card">
      <img className="card-img-top" src={product.images[0]} />
      <div className="card-body productDetails">
        <h4 className="card-title">{product.title}</h4>
        <p className="card-text">{product.brand}</p>
        <p className="card-text">
          Rs. {product.price} <span className="strikedPrice"><del>Rs. 1499</del></span> (68% off)
        </p>
      </div>
      <div className="card-body wishlist">
        <a className="btn wishlistButton" onClick={()=>{onAddWishlist(product)}}><i className="fa-solid fa-heart"></i> Wishlist</a>
        <a className="btn wishlistButton" onClick={()=>{onAddCart(product)}}><i className="fa-solid fa-cart-shopping"></i> Add to Cart</a>
        <p className="card-text">Size: S</p>
        <p className="card-text">
          Rs. {product.price} <span className="strikedPrice"><del>Rs. 1499</del></span> (68% off)
        </p>
      </div>
    </div>
))}
  </div>

  <div><p></p></div>
</div>

          )
}

export default Womens

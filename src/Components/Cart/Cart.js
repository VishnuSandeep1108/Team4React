import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './Cart.module.css';

import a from './empty-cart.gif'

//import emptyImg from '../../Assests/empty-cart.gif'

function Cart() {
    const [username,setUsername] = useState("a");
    const [currentUser,setCurrentUser] = useState(null);
    const[cart,setCart]=useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [Coupon,setCoupon]=useState("")
    const[userID,setUserID]=useState("547a")
    let cartTax=0;
    let cartTotal=0;
    const [discount,setdiscount]=useState(0)
    

    useEffect(
        ()=>{
            axios.get(`http://localhost:8000/users/?username=${username}`).then((user)=>{
                setCurrentUser(user.data[0]);
                setCart(user.data[0].cart);       
                totalPriceCalculator();
                
            });
        },[cart]
    )
    
    // useEffect(
    //     ()=>{
    //         applyCode();
    //     },[totalPrice]
    // );
   
    
    function totalPriceCalculator()
    {
        let total = 0;
        if(currentUser)
        {
            //console.log("USER: ",currentUser);
            
            currentUser.cart.forEach((cartItem)=>{
                total+=(cartItem.itemCount * cartItem.price);
            })

            setTotalPrice(total);
            
        }
    }

    function countDecrease(cartItem,index)
    {
        console.log("USERID: ",userID);
        
        let temp = currentUser;

        temp.cart.forEach((tempItem)=>{
            if(tempItem.id == cartItem.id)
            {   if(tempItem.itemCount===1){
                temp.cart.splice(index,1)
            }
              else 
              
                tempItem.itemCount = tempItem.itemCount-1;
            }
        })

        setCurrentUser(temp);
        setCart(temp.cart);
        axios.put(`http://localhost:8000/users/${userID}`,temp).then(()=>{
            console.log("Updated!");      
        })
        applyCode(totalPrice);
    }

    const countIncrease=(cartItem)=>{
        let temp = currentUser;

        temp.cart.forEach((tempItem)=>{
            if(tempItem.id == cartItem.id)
            {
                
                tempItem.itemCount = tempItem.itemCount+1;
            }
        })

        setCurrentUser(temp);
        setCart(temp.cart);
        axios.put(`http://localhost:8000/users/${userID}`,temp).then(()=>{
            console.log("Updated!");      
        })
        applyCode(totalPrice);
    }

    const removeItem=(cartItem,index)=>{
        let temp = currentUser;
        temp.cart.forEach((tempItem)=>{
            if(tempItem.id===cartItem.id){
                {
                    temp.cart.splice(index,1)
                }
              
            }
            setCurrentUser(temp)
            setCart(temp.cart)
            axios.put(`http://localhost:8000/users/${userID}`,temp).then(()=>{
                console.log("Updated!");      
            })
        })
        applyCode(totalPrice);
    }
     
    cartTax=(totalPrice*0.06)
    cartTotal=(totalPrice+cartTax)-discount;
    //setdiscount(totalPrice*0.1)
    
    const applyCode=(totalPrice)=>{
        let d=0
        // if(currentUser.cart){
            if(Coupon==="Happy10")
                {
                    currentUser.cart.forEach((cartItem)=>{
                        d+=totalPrice*0.1
                    })
                    
                }
                else
                {
                    // alert("Invalid Coupon Code!")
                }
        
        // }
        
        setdiscount(d)
        
    }

    const onChangeHandler=(e)=>{
        setCoupon(e.target.value)
        let c=Coupon;
        console.log("called")
        if(c!="Happy10")
        {setdiscount(0);
            console.log("hi")
        }
        
    } 
    return (    
    <div className={styles[`content-wrapper`]}>
        <div className={styles[`wrapper`]}>
            <h1>CART</h1>
            <div className={styles[`project`]}>
                <div className={styles[`left-bar`]}>

                {cart && cart.length>0 ? (
                    cart.map((cartItem,index)=>{            
            return (
                <div className={styles[`shop`]}>
                    <div className={styles[`box`]} key={cartItem.id}> 
                    <p onClick={()=>removeItem(cartItem,index)} className={styles[`btn-area`]} >
                            <i className="fa fa-close" style={{fontSize:'18px'}}></i>
                            <span className={styles[`btn2`]} onClick={()=>removeItem(cartItem,index)}></span>
                        </p>
                    <img src={cartItem.images[0]} />
                    <div className={styles[`content`]}>
                            <span><h4>{cartItem.title}</h4></span><span><h4>Rs. {cartItem.price}</h4></span> <span><h4><span className={styles[`quantityBtn`]} onClick={()=>{countDecrease(cartItem,index)}}> - </span> &nbsp;<span>{cartItem.itemCount}</span> &nbsp;<span className='quantityBtn' onClick={()=>{countIncrease(cartItem)}}> + </span></h4></span>

                   
                    </div>    
                    </div> 
                    </div> 
                
               
            )
            })):<div className={styles[`shop`]}><img className={styles[`empty-cart`]} src={a}/> </div>
         }
         
        </div>
                
        <div className={styles[`bar`]}>
        <div className={styles[`right-bar`]}>
            <h3>Coupons</h3>

        <input type="text" onChange={onChangeHandler} placeholder='Enter Coupon Code'></input><br/>
            {/* <a onClick={()=>applyCode(totalPrice)}><i className='fas fa-tag'></i>Apply</a></span> */}
            <a className={styles[`top-sellers-categories`]} onClick={()=>applyCode(totalPrice)}>
              <span className={styles[`top-border`]}></span>
              <i className='fa fa-tag'></i>
              <span>Apply Code</span>
              <span className={styles[`bottom-border`]}></span>
            </a>

        </div>    
        <div className={styles[`right-bar`]}>
        <h3>Price Details</h3>
        <hr></hr>
        <br/>
        <p>Subtotal : Rs. {totalPrice.toFixed(2)} /-</p>
        <p>Tax (6%) : Rs. {cartTax.toFixed(2)} /-</p>
        <p>Discount : Rs. {discount.toFixed(2)} /-</p>
        <p>Total    : Rs. {cartTotal.toFixed(2)} /-</p>
        {/* <a><i className='fa fa-shopping-cart'></i>Place Order</a> */}
        <a className={styles[`top-sellers-categories`]}>
              <span className={styles[`top-border`]}></span>
              <i className='fa fa-shopping-cart'></i>
              <span>Place Order</span>
              <span className={styles[`bottom-border`]}></span>
            </a>
        </div>
        </div>
      </div>
      </div>
      </div>
      
    )
    
    
   
    
}

export default Cart






{/* <div className='right-bar'>
        <h3>Price Details</h3>
        <br/>
        <hr></hr>
        <br/>
        <p>Subtotal : Rs. {totalPrice.toFixed(2)} /-</p>
        <p>Tax (6%) : Rs. {cartTax.toFixed(2)} /-</p>
        <p>Total    : Rs. {cartTotal.toFixed(2)} /-</p>
        <a><i className='fa fa-shopping-cart'></i>Checkout</a>
        </div> */}


   
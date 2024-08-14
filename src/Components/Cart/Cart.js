import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './Cart.css';

import emptyImg from './../../Assests/empty-cart.gif'

function Cart() {
    const [username,setUsername] = useState("a");
    const [currentUser,setCurrentUser] = useState(null);
    const[cart,setCart]=useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [Coupon,setCoupon]=useState("")
    const{userID,setUserID}=useState("547a")
    let cartTax=0;
    let cartTotal=0;
    const [discount,setdiscount]=useState(0)
    

    useEffect(
        ()=>{
            axios.get(`http://localhost:9000/users?username=${username}`).then((user)=>{
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
        axios.put(`http://localhost:9000/users/id=${userID}`,temp).then(()=>{
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
        axios.put(`http://localhost:9000/users/id=${userID}`,temp).then(()=>{
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
            axios.put(`http://localhost:9000/users/id=${userID}`,temp).then(()=>{
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
        // }
        
        setdiscount(d)
        
    }
 
    return (    
    <div className='content-wrapper'>
        <div className='wrapper'>
            <div className='project'>
                <div className='left-bar'>

                {cart && cart.length>0 ? cart.map((cartItem,index)=>{            
            return (
                <div className='shop'>
                    <div className='box' key={cartItem.id}> 
                    <img src={cartItem.images[0]} />
                    <div className='content'>
                    <h3>{cartItem.title}</h3>
                    <h3>Price: Rs. {cartItem.price}</h3>
                    <h3><span className='quantityBtn' onClick={()=>{countDecrease(cartItem,index)}}> - </span> &nbsp;<span>{cartItem.itemCount}</span> &nbsp;<span className='quantityBtn' onClick={()=>{countIncrease(cartItem)}}> + </span></h3>
                    </div>
                    <p className="btn-area" >
                            <i className="fa fa-trash"></i>
                            <span className="btn2" onClick={()=>removeItem(cartItem,index)}>Remove</span>
                        </p>
                    </div>  
                    </div> 
                
               
            )
            }):<div className='shop'><img className='empty-cart' src={emptyImg}/> </div>
         }
         
        </div>
                
        <div className='bar'>
        <div className='right-bar'>
            <h3>Coupons</h3><br/>
        <span><input type="text" onChange={(e)=>{setCoupon(e.target.value)}} placeholder='Enter Coupon Code'></input></span>&nbsp;<span>
            <a onClick={()=>applyCode(totalPrice)}><i className='fas fa-tag'></i>Apply</a></span>
        </div>    
        <div className='right-bar'>
        <h3>Price Details</h3>
        <br/>
        <hr></hr>
        <br/>
        <p>Subtotal : Rs. {totalPrice.toFixed(2)} /-</p>
        <p>Tax (6%) : Rs. {cartTax.toFixed(2)} /-</p>
        <p>Discount : Rs. {discount.toFixed(2)} /-</p>
        <p>Total    : Rs. {cartTotal.toFixed(2)} /-</p>
        <a><i className='fa fa-shopping-cart'></i>Place Order</a>
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


   
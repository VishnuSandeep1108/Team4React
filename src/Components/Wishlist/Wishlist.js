import React, { useEffect, useState } from 'react'
import './Wishlist.css'
import h from './giphy.gif'
import axios from 'axios'
import { Dropdown } from 'bootstrap'
function Wishlist() {
    const [username,setUsername]=useState('John')
    const [userid,setid]=useState('aacd')
    const[data,setData]=useState([])
    const[cart,setCart]=useState([])
    const [category,setCategory]=useState('none')
    const [n,setsorted]=useState()
    const [searche,hhh]=useState('')
    useEffect(
        ()=>{
            axios.get(`http://localhost:8000/users?username=${username}`).then((user)=>{
                console.log("DATA: ",user.data);
                console.log("DATA[0]: ",user.data[0]);
                
                setData(user.data)})
        },[data]
    )
    const cartadd=(j)=>{
        //data.cart.push(j)
        let temp = cart;
        temp.push(j);
        //setCart([...cart,j]);
        setCart(temp);
        const g=data[0].cart
        let flag=false
        for(let i=0;i<data[0].cart.length;i++){
            if(j.id===data[0].cart[i].id){
                data[0].cart[i].itemCount+=1
                flag=true
            }
        }
        if(!flag){
            data[0].cart.push(j)
        }
        setData([...data])
        axios.put(`http://localhost:8000/users/${userid}`,data[0]).then(()=>{console.log('added to cart')})
        alert('Added to Cart')
    }

    const wishlistdelete=(j)=>{
        const f=data[0].wishlist
        data[0].wishlist.splice(f.indexOf(j),1)
        setData([...data])
        axios.put(`http://localhost:8000/users/${userid}`,data[0]).then(()=>{console.log('removed from wishlist')})
        alert('deleted from wishlist')
    }
    const categoryy=(val)=>{
        setCategory(val)
    }
    
    const search=(event)=>{
        hhh(event.target.value)
    }
  return (

//     </div>
<>
<h1>WISHLIST</h1>
<input type='text' onChange={search}></input><button className='button-85' onClick={()=>categoryy('mens-shirts')}>Mens Clothing</button> <button className='button-85' onClick={()=>categoryy('womens-dresses')}>Womens Clothing</button>    <button className='button-85' onClick={()=>categoryy('mens-shoes')}>Mens Footwear</button> <button className='button-85' onClick={()=>categoryy('womens-shoes')}>Womens Footwear</button><button className='button-85' onClick={()=>categoryy('anything')}>All Categories</button>
  {/* <button onClick={sortwishlist}>Sort based on price</button> */}
  {/* {n.map((i)=>{console.log(i)})} */}
<div className='wrapper'>
{/* {data.map((i)=>{return <div>{i.wishlist.map((j)=>{return <div className='box'><img src={j.images[0]}></img><h3>{j.title}</h3><h5>{j.price}</h5><button className='button button1' onClick={()=>cartadd(j)}>Add to Cart</button><button className='button button2'>Delete</button></div>})} 
</div>})} */}
{/* <h1>CART</h1>
{cart} */}

{/* {data.map((i)=>{return <div>{i.cart.map((j)=>{return <div>{j.id}</div>})}</div>})} */}

{data.map((i)=>{

if(i.wishlist.length===0){
    return(
        <img src={h} style={{width:'1300px',height:'500px'}} alt='hello'></img>
    )
}
else{
return (
<div>
     {i.wishlist.map((wishlistItem)=>{
     if((wishlistItem.tags[0]===searche || wishlistItem.category===searche)){ return (
        <div className='box'>
            <img src={wishlistItem.images[0]}></img>
            <h3>{wishlistItem.title}</h3>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
            {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
        </div>
    )}
    if((wishlistItem.category==='mens-shoes' && category==='mens-shoes')){ return (
        <div className='box'>
            <img src={wishlistItem.images[0]}></img>
            <h3>{wishlistItem.title}</h3>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
            {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
        </div>
    )}
    
    else if(wishlistItem.category==='womens-shoes' && category==='womens-shoes'){
        return (
            <div className='box'>
                <img src={wishlistItem.images[0]}></img>
                <h3>{wishlistItem.title}</h3>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}

     else if(wishlistItem.category==='mens-shirts' && category==='mens-shirts'){
        return (
            <div className='box'>
                <img src={wishlistItem.images[0]}></img>
                <h3>{wishlistItem.title}</h3>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}


     else if(wishlistItem.category==='womens-dresses' && category==='womens-dresses'){
        return (
            <div className='box'>
                <img src={wishlistItem.images[0]}></img>
                <h3>{wishlistItem.title}</h3>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}


    
    else if(category==='anything'){
    return (
        <div className='box'>
            <img src={wishlistItem.images[0]}></img>
            <h3>{wishlistItem.title}</h3>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} <i class="fa-solid fa-copyright"></i> {wishlistItem.brand}   <i class="fa-solid fa-code"></i> {wishlistItem.sku}</h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className='button button1' onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <button className='button button2' onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button>
            {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
        </div>
    )
    }

})}
</div>
)
}})}

{/* <div className='box2'>
    <h1>CART</h1>
    {
        cart.map((cartItem)=>{
            return (
                <div>
                    <img src={cartItem.images[0]}></img>
                    <h3>{cartItem.title}</h3>
                    <h5>{cartItem.price}</h5>
                    <h5>{cartItem.itemcount}</h5>
                </div>
            )
        })
    }
</div> */}
</div>
</>
)
}

export default Wishlist

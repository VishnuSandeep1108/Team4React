import React, { useEffect, useState } from 'react'
import styles from './Wishlist.module.css'
import h from './empty-wishlist.png'
import axios from 'axios'
import { Dropdown } from 'bootstrap'


function Wishlist() {
    const [searchee,setSearch]=useState(['clothing','mens-shirts','womens-dresses','womens-shoes','footwear','mens-shoes',''])
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
        const id=event.target.value
      let flag=false
        for(let i of searchee){
       
            if (id===i.substring(0,id.length)){
                hhh(i)
                flag=true
            }
            console.log(i.substring(0,id.length))
            console.log(id)
        }
        if(!flag){
            hhh('Not Found')
        }


    }
  return (

//     </div>
<>
<h1>WISHLIST</h1>
<a className={styles[`top-sellers-categories`]} onClick={()=>categoryy('mens-shirts')}><span className={styles[`top-border`]}></span>
              <span>Mens clothing</span>
              <span className={styles[`bottom-border`]}></span></a> <a className={styles[`top-sellers-categories`]} onClick={()=>categoryy('womens-dresses')}><span className={styles[`top-border`]}></span>
              <span>Womens Clothing</span>
              <span className={styles[`bottom-border`]}></span></a> <a className={styles[`top-sellers-categories`]} onClick={()=>categoryy('mens-shoes')}> <span className={styles[`top-border`]}></span>
              <span>Mens Footwear</span>
              <span className={styles[`bottom-border`]}></span> </a> <a className={styles[`top-sellers-categories`]} onClick={()=>categoryy('womens-shoes')}> <span className={styles[`top-border`]}></span>
              <span>Womens Footwear</span>
              <span className={styles[`bottom-border`]}></span> </a> <a className={styles[`top-sellers-categories`]} onClick={()=>categoryy('anything')}> <span className={styles[`top-border`]}></span>
              <span>All Categories</span>
              <span className={styles[`bottom-border`]}></span> </a>  <input type='text' className='styled-input' onChange={search}></input>
  {/* {n.map((i)=>{console.log(i)})} */}
<div className={styles[`wrapper`]}>
{/* {data.map((i)=>{return <div>{i.wishlist.map((j)=>{return <div className={styles[`box`]}><img src={j.images[0]}></img><h3>{j.title}</h3><h5>{j.price}</h5><button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(j)}>Add to Cart</button><button className={`${styles[`button`]} ${styles[`button2`]}`}>Delete</button></div>})} 
</div>})} */}
{/* <h1>CART</h1>
{cart} */}

{/* {data.map((i)=>{return <div>{i.cart.map((j)=>{return <div>{j.id}</div>})}</div>})} */}

{data.map((i)=>{

if(i.wishlist.length===0){
    return(
        <img src={h} style={{width:'1000px',height:'400px',margin:'auto'}} alt='hello'></img>
    )
}
else{
return (
<div>
     {i.wishlist.map((wishlistItem)=>{
     if((wishlistItem.tags[0]===searche || wishlistItem.category===searche)){ return (
        <div className={styles[`box`]}>
             <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
            <img src={wishlistItem.images[0]}></img>
            <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating}  </h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}>X</button> */}
            {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
        </div>
    )}
    if((wishlistItem.category==='mens-shoes' && category==='mens-shoes')){ return (
        <div className={styles[`box`]}>
              <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
            <img src={wishlistItem.images[0]}></img>
            <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating} </h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button> */}
            {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
        </div>
    )}
    
    else if(wishlistItem.category==='womens-shoes' && category==='womens-shoes'){
        return (
            <div className={styles[`box`]}>
                  <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
                <img src={wishlistItem.images[0]}></img>
                <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button> */}
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}

     else if(wishlistItem.category==='mens-shirts' && category==='mens-shirts'){
        return (
            <div className={styles[`box`]}>
                    <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
                <img src={wishlistItem.images[0]}></img>
                <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button> */}
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}


     else if(wishlistItem.category==='womens-dresses' && category==='womens-dresses'){
        return (
            <div className={styles[`box`]}>
                    <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
                <img src={wishlistItem.images[0]}></img>
                <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
                <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating}</h3>
                <h4>$ {wishlistItem.price}</h4>
                <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button> */}
                {/* <img src='https://assets.dummyjson.com/public/qr-code.png'/> */}
            </div>
     )}


    
    else if(category==='anything'){
    return (
        <div className={styles[`box`]}>
                <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i className='fa fa-close' style={{fontSize:'24px'}}></i></button>
            <img src={wishlistItem.images[0]}></img>
            <div>
            <h3>{wishlistItem.title}</h3>
            <i class="fa-solid fa-copyright" style={{marginLeft:'130px'}}></i> {wishlistItem.brand}
            </div>
            <h3><i class="fa-solid fa-star"> </i>{wishlistItem.rating}</h3>
            <h4>$ {wishlistItem.price}</h4>
            <button className={`${styles[`button`]} ${styles[`button1`]}`} onClick={()=>cartadd(wishlistItem)}><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            {/* <button className={`${styles[`button`]} ${styles[`button2`]}`} onClick={()=>wishlistdelete(wishlistItem)}><i class="fa-solid fa-heart"></i> Delete from Wishlist</button> */}
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

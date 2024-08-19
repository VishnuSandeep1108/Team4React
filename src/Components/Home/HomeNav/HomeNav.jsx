import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import {UserContext} from "../../../App"


import styles from "./HomeNav.module.css";

function HomeNav() {
    const navigate = useNavigate();
    const {username, setUsername} = useContext(UserContext);

    function onWishlistClick(){
        console.log("USERNAME: ",username);
        
        if(username)
          navigate("/wishlist");
        else
          navigate("/auth");
      }
    
      function onCartClick()
      {
        console.log("USERNAME: ",username);
    
        if(username)
          navigate("/cart");
        else
          navigate("/auth");
      }
  return (
    <nav className={`navbar navbar-expand-xl ${styles[`navibar`]}`} style={{padding: "0 30px"}}>
    <div className={`container-fluid`}>
        <Link to={"/"} style={{"padding":"15px 0","fontSize":"3em",fontWeight: "700", fontStyle: "normal"}} className={`navbar-brand ${styles[`navibar-brand`]}`}>FAshioneeRS!</Link>
        <button className={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon ${styles[`navibar-toggler-icon`]}`}></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
                <li className={`nav-item ${styles[`naviitem`]}`}>
                    <Link style={{margin:"10px 20px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page">Home</Link>
                </li>
                <li className={`nav-item ${styles[`naviitem`]}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/men"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page">Men</Link>
                </li>
                <li className={`nav-item ${styles[`naviitem`]}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/women"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page">Women</Link>
                </li>
                <li className={`nav-item ${styles[`naviitem`]}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/kids"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page">Kids</Link>
                </li>
                <li className={`nav-item ${styles[`naviitem`]}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/footwear"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page">Footwear</Link>
                </li>

                <li className={`nav-item ${styles[`naviitem`]} ${styles[`splnaviitem`]}`}>
                    <li style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/wishlist"} className={`nav-link active ${styles[`navilink`]}`} aria-current="page" onClick={()=>{onWishlistClick()}}>Wishlist</li>
                </li>
                <li className={`nav-item ${styles[`naviitem`]} ${styles[`splnaviitem`]}`}>
                    <li style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/cart"} className={`nav-link active ${styles[`navilink`]}`} onClick={()=>{onCartClick()}}>Cart</li>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default HomeNav;

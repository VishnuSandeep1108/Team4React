import React from 'react';
import { Link } from 'react-router-dom';


import styles from "./HomeNav.module.css";

function HomeNav() {
  return (
    <nav className={`navbar navbar-expand-xl ${`navibar`}`} style={{padding: "0 30px"}}>
    <div class={`container-fluid`}>
        <Link to={"/"} style={{"padding":"15px 0","fontSize":"3em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} class={`navbar-brand ${`navibar-brand`}`}>FAshioneeRS!</Link>
        <button class={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class={`navbar-toggler-icon ${`navibar-toggler-icon`}`}></span>
        </button>
        <div class={`collapse navbar-collapse`} id="navbarSupportedContent">
            <ul class={`navbar-nav me-auto mb-2 mb-lg-0`}>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/"} class={`nav-link active ${`navilink`}`} aria-current="page">Home</Link>
                </li>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/men"} class={`nav-link active ${`navilink`}`} aria-current="page">Men</Link>
                </li>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/women"} class={`nav-link active ${`navilink`}`} aria-current="page">Women</Link>
                </li>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/kids"} class={`nav-link active ${`navilink`}`} aria-current="page">Kids</Link>
                </li>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/footwear"} class={`nav-link active ${`navilink`}`} aria-current="page">Footwear</Link>
                </li>

                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/wishlist"} class={`nav-link active ${`navilink`}`} aria-current="page">Wishlist</Link>
                </li>
                <li class={`nav-item ${`naviitem`}`}>
                    <Link style={{margin:"10px 30px", fontSize: "2em",color: "white",fontFamily: "Cinzel", fontWeight: "700", fontStyle: "normal"}} to={"/cart"} class={`nav-link active ${`navilink`}`}>Cart</Link>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default HomeNav;

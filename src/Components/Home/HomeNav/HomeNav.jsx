import React from 'react';
import { Link } from 'react-router-dom';


import "./HomeNav.css";

function HomeNav() {
  return (
    <nav className="navbar navbar-expand-xl">
    <div class="container-fluid">
        <Link to={"/"} style={{"padding":"15px 0"}} class="navbar-brand">FAshioneeRS!</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link style={{color: "white"}} to={"/"} class="nav-link active" aria-current="page">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/men"} class="nav-link" aria-current="page">Men</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/women"} class="nav-link" aria-current="page">Women</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/kids"} class="nav-link" aria-current="page">Kids</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/footwear"} class="nav-link" aria-current="page">Footwear</Link>
                </li>

                <li class="nav-item">
                    <Link to={"/wishlist"} class="nav-link" aria-current="page">Wishlist</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/cart"} class="nav-link">Cart</Link>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default HomeNav;

import React from 'react';

import "./HomeNav.css";

function HomeNav() {
  return (
    <nav className="navbar navbar-expand-xl">
    <div class="container-fluid">
        <a style={{"padding":"15px 0"}} class="navbar-brand" href="#">FAshioneeRS!</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">X</span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Men</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Women</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Kids</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Footwear</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Wishlist</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Cart</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default HomeNav;

import React, { useEffect, useState } from 'react';

import HomeNav from './HomeNav/HomeNav';
import Carousel from './Carousel/carousel';
import TopSellers from './TopSellers/TopSellers';
import NewArrivals from './NewArrivals/NewArrivals';
import Posters from './Posters/Posters';
import ShoesBanner from './ShoesBanner/ShoesBanner';
import Magazines from './Magazines/Magazines';
import Subscribe from './Subscribe/Subscribe';

import "./Home.css";

function Home() {

  const [homeImgUrl, setHomeImgUrl] = useState(null);

  const homeCarouselTopStyle = {
    position: 'absolute',
    top: '0',
    backgroundColor: "black",
    backgroundImage: `url(${homeImgUrl})`,
    backgroundAttachment: "fixed",
    backgroundPosition: '0% 75%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  }

  return (
    <div className='home-container'>

      <div style={homeCarouselTopStyle} className='home'>
        <HomeNav />
        <Carousel setHomeImgUrl={setHomeImgUrl} />
        <div className='black-screen'></div>
      </div>

      <TopSellers />
      <NewArrivals />
      <Posters />
      <ShoesBanner />
      <Magazines />
      <Subscribe />
    </div>
  )
}

export default Home;

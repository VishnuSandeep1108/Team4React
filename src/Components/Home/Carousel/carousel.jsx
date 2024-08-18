import React, { useState,useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import styles from "./carousel.module.css";

function Carousel(props) {
    let interval;

    const {setHomeImgUrl} = props;
    const [currentIndex, setCurrentIndex] = useState(1);
    const [click,setClick] = useState(false);

    useEffect(()=>{
        interval = setInterval(()=>{
          increaseIndex();
        },5000)

        return ()=>{
            clearInterval(interval);
        }
    },[click])

    const carouselItems = [
        {"id":1,"toptext":"F r o m $59", "middletext":"R e d C o l l e c t i o n","bottomtext":"S h o p N o w", "url":"./Home-Images/carousel1.jpg"},
        {"id":2,"toptext":"F r o m $69", "middletext":"N e w A r r i v a l s","bottomtext":"S h o p N o w", "url":"./Home-Images/carousel22.jpg"},
        {"id":3,"toptext":"F r o m $79", "middletext":"R e a d y T o W e a r","bottomtext":"S h o p N o w", "url":"./Home-Images/carousel3.webp"}
    ]

    function increaseIndex()
    {        
        // let timeNow = new Date();
        // console.log(timeNow.getUTCSeconds());
        
        setCurrentIndex((prevValue)=>(prevValue!=3)?prevValue+1:prevValue = 1);
    }

    function decreaseIndex()
    {
        setCurrentIndex((prevValue)=>(prevValue!=1)?prevValue-1:prevValue = 3);
    }

  return (
    <div className={styles[`carousel-content`]}>
        {carouselItems.map((carouselItem)=>{           
            if(carouselItem.id == currentIndex)
            {
                setHomeImgUrl(carouselItem.url);
                                
                return (
                    <div className={styles[`text-of-carousel`]}>
                        <h3 className={styles[`carousel-text-top`]}>{carouselItem.toptext}</h3>
                        <h1 className={styles[`carousel-text-middle`]}>{carouselItem.middletext}</h1>
                        <h3 className={styles[`carousel-text-bottom`]}>{carouselItem.bottomtext}</h3>
                    </div>
                )
            }
        })}

        <div>
            <div className={`${styles[`carousel-arrow`]} ${styles[`carousel-left-arrow`]}`} onClick={()=>{setClick(!click);decreaseIndex()}}>
                <p></p>
                <p></p>
            </div>

            <div className={`${styles[`carousel-arrow`]} ${styles[`carousel-right-arrow`]}`} onClick={()=>{setClick(!click);increaseIndex()}}>
                <p></p>
                <p></p>
            </div>
            {/* <FaArrowLeft className='carousel-left-arrow' onClick={()=>{setClick(!click);decreaseIndex()}} />
            <FaArrowRight className='carousel-right-arrow' onClick={()=>{setClick(!click);increaseIndex()}} /> */}
        </div>
    </div>
  )
}

export default Carousel;

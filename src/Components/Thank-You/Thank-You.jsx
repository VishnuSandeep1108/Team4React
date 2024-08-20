import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Thank-You.module.css";

function ThankYou() {
    const navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    
    return (
        <div className={`container ${styles[`container`]}`}>
            <div className={`wrapper ${styles[`wrapper`]}`}>
                <svg
                    className={styles[`checkmark`]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                >
                    <circle
                    className={styles[`checkmark-circle`]}
                    cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                    />
                    <path
                    className={styles[`checkmark-check`]}
                    fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                </svg>
            </div>

            <div className={styles[`content`]}>
                <h3>Payment Successful!</h3>
                <h3>Thank you for shopping with us.</h3>
                <button className={styles[`home`]} onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default ThankYou;

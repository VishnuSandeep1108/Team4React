import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

function Checkout({ totalAmount }) {
    const navigate = useNavigate();

    return (
        <>
            <section id="payment-header" className={styles[`dark`]}>
                <h1>Paying ₹{ totalAmount }</h1>
            </section>
            <div className={styles[`pad`]}>
            <h3>Select Mode of Payment</h3>
            </div>
            <div class="buttons">
                <button className={styles[`dark`]} onClick={() => navigate('/card')}>
                    CARD
                </button>
                <button className={styles[`dark`]} onClick={() => navigate('/upi')}>
                    UPI
                </button>
            </div>
        </>
    );
}

export default Checkout;

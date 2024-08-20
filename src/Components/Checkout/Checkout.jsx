import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

import {TotalAmountContext} from "../../App";


function Checkout() {
    const navigate = useNavigate();
    const {totalAmount, setTotalAmount} = useContext(TotalAmountContext);


    return (
        <>
            <section className={`${styles[`payment-header`]} ${styles[`dark`]}`}>
                <h1 className={styles[`big-heading`]}>Paying ₹{totalAmount}</h1>
            </section>
            <div className={styles[`pad`]}>
                <h3 className={styles[`small-heading`]}>Select Mode of Payment</h3>
            </div>
            <div className={styles[`buttons`]}>
                <button className={styles[`dark`]} onClick={() => navigate("/card")}>
                    CARD
                </button>
                <button className={styles[`dark`]} onClick={() => navigate("/upi")}>
                    UPI
                </button>
            </div>
        </>
    );
}

export default Checkout;

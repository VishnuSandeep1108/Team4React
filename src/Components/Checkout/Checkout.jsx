import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ totalAmount }) {
    const navigate = useNavigate();

    return (
        <>
            <section id="payment-header" class="dark">
                <h1>Paying ₹{ totalAmount }</h1>
            </section>
            <div className="pad">
            <h3>Select Mode of Payment</h3>
            </div>
            <div class="buttons">
                <button class="dark" onClick={() => navigate('/card')}>
                    CARD
                </button>
                <button class="dark" onClick={() => navigate('/upi')}>
                    UPI
                </button>
            </div>
        </>
    );
}

export default Checkout;

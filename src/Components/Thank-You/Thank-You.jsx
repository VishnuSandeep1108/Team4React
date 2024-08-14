import React from "react";
import { useNavigate } from "react-router-dom";
import "./Thank-You.css";

function ThankYou() {
    const navigate = useNavigate();
    return (
        <div class="container">
            <div class="wrapper">
                <svg
                    class="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                >
                    <circle
                        class="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                    />
                    <path
                        class="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                </svg>
            </div>

            <div class="content">
                <h3>Payment Successful!</h3>
                <h3>Thank you for shopping with us.</h3>
                <button class="home" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default ThankYou;

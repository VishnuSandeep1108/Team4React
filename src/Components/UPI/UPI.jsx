import React,{useContext} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./UPI.module.css";

import {TotalAmountContext} from "../../App";


function UPI() {
    const {totalAmount, setTotalAmount} = useContext(TotalAmountContext);

    const form = useForm({ mode: "all" });
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = () => {
        navigate("/thankyou");
    };

    return (
        <>
            <section
                className={`${styles[`payment-header`]} ${styles[`dark`]}`}
            >
                <h1 className={styles[`big-heading`]}>Paying ₹{totalAmount}</h1>
            </section>
            <div className={`card`}>
                <div className={`container-fluid`}>
                    <div className={`row justify-content-center`}>
                        <div className={`col-lg-6 col-md-8`}>
                            <div
                                className={`payment-box form-card p-4 ${
                                    styles[`payment-box`]
                                } ${styles[`form-card`]}`}
                            >
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <div
                                        className={`row justify-content-center mb-4`}
                                    >
                                        <div className={`col-sm-3 col-5`}>
                                            <div
                                                className={`mx-auto`}
                                                data-value="amex"
                                            >
                                                <img
                                                    className={`${
                                                        styles[`fit-image`]
                                                    } ${styles[`companies`]}`}
                                                    src="/checkout-images/GPay.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div className={`col-sm-3 col-5`}>
                                            <div
                                                className={`mx-auto`}
                                                data-value="visa"
                                            >
                                                <img
                                                    className={`${
                                                        styles[`fit-image`]
                                                    } ${styles[`companies`]}`}
                                                    src="/checkout-images/PhonePe.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div className={`col-sm-3 col-5`}>
                                            <div
                                                className={`mx-auto`}
                                                data-value="master"
                                            >
                                                <img
                                                    className={`${
                                                        styles[`fit-image`]
                                                    } ${styles[`companies`]}`}
                                                    src="/checkout-images/Paytm.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div className={`col-sm-3 col-5`}>
                                            <div
                                                className={`mx-auto`}
                                                data-value="rupay"
                                            >
                                                <img
                                                    className={`${
                                                        styles[`fit-image`]
                                                    } ${styles[`companies`]}`}
                                                    src="/checkout-images/AmazonPay.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`row justify-content-center`}
                                    >
                                        <div
                                            className={`col-12`}
                                        >
                                            <div
                                                style={{ borderRadius: "8px" }}
                                                className={styles[`input-box`]}
                                            >
                                                <input
                                                    type="text"
                                                    {...register("upiId", {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                "UPI ID is a required field!",
                                                        },
                                                        pattern: {
                                                            value: /^[a-z]{2,15}@[a-z]{2,10}$/,
                                                            message:
                                                                "UPI ID is invalid!",
                                                        },
                                                    })}
                                                    className={`form-control ${styles[`form-control`]}`}
                                                    placeholder="johnsmith@bank"
                                                />
                                                <label className={styles[`label`]}>UPI ID</label>
                                                <div
                                                    className={`text-danger ${
                                                        styles[`text-danger`]
                                                    }`}
                                                >
                                                    <span>
                                                        {errors.upiId?.message}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div
                                        className={`row justify-content-center`}
                                    >
                                        <div className={`col-md-12`}>
                                            <div className={styles[`pay`]}>
                                                <button
                                                    className={`btn btn-lg btn-block ${
                                                        styles[`pay-button`]
                                                    }`}
                                                    type="submit"
                                                >
                                                    <strong>Pay</strong>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UPI;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./UPI.css";

function UPI({ totalAmount }) {
    const form = useForm({mode: "all"});
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = () => {
        navigate("/thankyou");
    };

    return (
        <>
            <section id="payment-header" class="dark">
                <h1>Paying ₹{totalAmount}</h1>
            </section>
            <div className="card">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="payment-box form-card p-4">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <div class="row justify-content-center mb-4">
                                        <div class="col-sm-3 col-5">
                                            <div
                                                class="mx-auto"
                                                data-value="amex"
                                            >
                                                <img
                                                    class="fit-image companies"
                                                    src="/checkout-images/GPay.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-5">
                                            <div
                                                class="mx-auto"
                                                data-value="visa"
                                            >
                                                <img
                                                    class="fit-image companies"
                                                    src="/checkout-images/PhonePe.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-5">
                                            <div
                                                class="mx-auto"
                                                data-value="master"
                                            >
                                                <img
                                                    class="fit-image companies"
                                                    src="/checkout-images/Paytm.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-5">
                                            <div
                                                class="mx-auto"
                                                data-value="rupay"
                                            >
                                                <img
                                                    class="fit-image companies"
                                                    src="/checkout-images/AmazonPay.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <div
                                                style={{ borderRadius: "8px" }}
                                                className="input-box"
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
                                                    className="form-control"
                                                    placeholder="johnsmith@bank"
                                                />
                                                <label>UPI ID</label>
                                                <div className="text-danger">
                                                    <span>
                                                        {
                                                            errors.upiId
                                                                ?.message
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="row justify-content-center">
                                        <div className="col-md-12">
                                            <div className="pay">
                                                <button
                                                    className="btn btn-lg btn-block pay-button"
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

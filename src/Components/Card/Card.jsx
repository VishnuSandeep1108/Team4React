import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ totalAmount }) {
    const form = useForm({ mode: "all" });
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const [name, setName] = useState();
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const nameHandler = (e) => {
        let value = e.target.value.replace(/[^A-Za-z'-\s]/g, "");
        const formattedValue = value.match(/^[A-Za-z'-\s]{0,30}$/) || "";
        setName(formattedValue);
    };

    const cardNumberHandler = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";

        setCardNumber(formattedValue);
    };

    const expiryDateHandler = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 4);
        const formattedValue = value.match(/.{1,2}/g)?.join("/") || "";

        setExpiryDate(formattedValue);
    };

    const cvvHandler = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 3);
        const formattedValue = value.match(/.{1,3}/g) || "";
        setCvv(formattedValue);
    };

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
                                                    src="/checkout-images/AmericanExpress.png"
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
                                                    src="/checkout-images/VISA.png"
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
                                                    src="/checkout-images/MasterCard.png"
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
                                                    src="/checkout-images/RuPay.png"
                                                    width="105px"
                                                    height="55px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <div
                                                style={{ borderRadius: "8px"}}
                                                className={`input-box ${errors.name}`}
                                            >
                                                <input
                                                    type="text"
                                                    {...register("name", {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                "*Name is a required field!",
                                                        },
                                                        minLength: {
                                                            value: 5,
                                                            message:
                                                                "Name should be at least 5 characters!",
                                                        },
                                                    })}
                                                    value={name}
                                                    onChange={nameHandler}
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="John Smith"
                                                />
                                                <label htmlFor="name">
                                                    Name
                                                </label>
                                                <div className="text-danger">
                                                    <span>
                                                        {errors.name?.message}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <div
                                                style={{ borderRadius: "8px" }}
                                                className="input-box"
                                            >
                                                <input
                                                    type="text"
                                                    {...register("cardNumber", {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                "*Card Number is a required field!",
                                                        },
                                                        pattern: {
                                                            value: /^\d{4} \d{4} \d{4} \d{4}$/,
                                                            message:
                                                                "Card Number is invalid!",
                                                        },
                                                    })}
                                                    value={cardNumber}
                                                    onChange={cardNumberHandler}
                                                    className="form-control"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                                <label>Card Number</label>
                                                <div className="text-danger">
                                                    <span>
                                                        {
                                                            errors.cardNumber
                                                                ?.message
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div
                                                        style={{
                                                            borderRadius: "8px",
                                                        }}
                                                        className="input-box"
                                                    >
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                "expiryDate",
                                                                {
                                                                    required: {
                                                                        value: true,
                                                                        message:
                                                                            "*Expiry Date is a required field!",
                                                                    },
                                                                    pattern: {
                                                                        value: /^[0-1][0-9]\/[0-9]{2}$/,
                                                                        message:
                                                                            "Expiry Date is invalid!",
                                                                    },
                                                                }
                                                            )}
                                                            value={expiryDate}
                                                            onChange={
                                                                expiryDateHandler
                                                            }
                                                            className="form-control"
                                                            placeholder="MM/YY"
                                                        />
                                                        <label>
                                                            Expiry Date
                                                        </label>
                                                        <div className="text-danger">
                                                            <span>
                                                                {
                                                                    errors
                                                                        .expiryDate
                                                                        ?.message
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div
                                                        style={{
                                                            borderRadius: "8px",
                                                        }}
                                                        className="input-box"
                                                    >
                                                        <input
                                                            type="password"
                                                            {...register(
                                                                "cvv",
                                                                {
                                                                    required: {
                                                                        value: true,
                                                                        message:
                                                                            "*CVV is a required field!",
                                                                    },
                                                                    minLength: {
                                                                        value: 3,
                                                                        message:
                                                                            "CVV must be 3 digits!",
                                                                    },
                                                                    maxLength: {
                                                                        value: 3,
                                                                        message:
                                                                            "CVV must only be 3 digits!",
                                                                    },
                                                                    pattern: {
                                                                        value: /^[0-9]{3}$/,
                                                                        message:
                                                                            "CVV is invalid!",
                                                                    },
                                                                }
                                                            )}
                                                            value={cvv}
                                                            onChange={
                                                                cvvHandler
                                                            }
                                                            className="form-control"
                                                            placeholder="&#9679;&#9679;&#9679;"
                                                        />
                                                        <label>CVV</label>
                                                        <div className="text-danger">
                                                            <span>
                                                                {
                                                                    errors.cvv
                                                                        ?.message
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default Card;

import React, { useState, useEffect, useContext } from 'react';
import styles from './Login.module.css'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import {UserContext} from "../../App";


const Login = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(true);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const {username, setUsername} = useContext(UserContext);

    const loginForm = useForm({ mode: "all" });
    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: formLoginState, reset: resetLoginForm } = loginForm;
    const { errors: loginErrors } = formLoginState;

    const regForm = useForm({ mode: "all" });
    const { register: signupRegister, handleSubmit: handleSignupSubmit, formState: formSignupState, reset: resetSignupForm } = regForm;
    const { errors: signupErrors } = formSignupState;

    const clearLogin = () => {
        setLoginUsername('');
        setLoginPassword('');
        resetLoginForm();
    }

    const clearSignup = () => {
        setSignupUsername('');
        setSignupPassword('');
        resetSignupForm();
    }

    useEffect(() => {
        if (isLogin) {
            clearSignup();
        } else {
            clearLogin();
        }
    }, [isLogin]);

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const onLogin = () => {
        const userValid = users.find(user => user.username === loginUsername && user.password === loginPassword);
        if (userValid) {
        {
            setUsername(loginUsername);
            navigate("/");
        }
        } else {
            alert('Invalid username or password');
        }
        clearLogin();
    };

    const handleRegister = () => {
        const userExists = users.some(user => user.username === signupUsername);

        if (userExists) {
            alert('Username already exists. Please choose a different username.');
        } else {
            const newUser = { username: signupUsername, password: signupPassword, wishlist: [], cart: [] };
            axios.post('http://localhost:8000/users', newUser)
                .then(response => {
                    if (response.status === 201) {
                        alert('Registration successful');
                        setUsers(prevUsers => [...prevUsers, newUser])
                    }
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                });
        }
        clearSignup();
    };

    const validateTerms = (value) => {
        return value || "You must accept the terms and conditions";
    }

    return (
        <div className={styles[`account-page`]}>
            <div className={styles[`form-background`]}>
                <h1>My Account</h1>
            </div>
            <div className={`container ${styles[`container`]}`}>
            <div className={`form-container ${styles[`form-container`]}`}>
                    <input type="radio" name="toggle"  className={`toggle-radio login ${styles[`toggle-radio`]} ${styles[`login`]} `} id="login" checked={isLogin} onChange={() => setIsLogin(true)} />
                    <input type="radio" name="toggle"  className={`toggle-radio signup ${styles[`toggle-radio`]} ${styles[`signup`]}`} id="signup" checked={!isLogin} onChange={() => setIsLogin(false)} />
                <div className={`form-btn ${styles[`form-btn`]}`}>
                    <label htmlFor="login" className={`toggle-label login-label ${styles[`toggle-label`]} ${styles[`login-label`]}`} >Login</label>
                    <label htmlFor="signup" className={`toggle-label signup-label ${styles[`toggle-label`]} ${styles[`signup-label`]}`}>Sign-up</label>
                    <div className={`Indicator ${styles[`Indicator`]}`}></div>
                </div>

                {isLogin ? (
                    <form  className={`form-content ${styles[`form-content`]}${styles[`LoginForm`]}`} onSubmit={handleLoginSubmit(onLogin)} noValidate>
                        <div className={styles[`input-box`]}>
                            <input style={{"width":"100%","height":"10%"}} type="text" placeholder="Username" {...loginRegister("username", {
                                required: { value: true, message: "Username is Required" },
                                minLength: { value: 0, message: "Username must contain at least 0 characters" }
                            })} autoComplete="off" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                            <p className={styles[`error`]}>{loginErrors.username?.message}</p>
                        </div>
                        <input type="password" placeholder="Password" {...loginRegister("password", {
                            required: { value: true, message: "Password is Required" },
                            minLength: { value: 0, message: "Password must contain at least 0 characters" }
                        })} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <p className={styles[`error`]}>{loginErrors.password?.message}</p>
                        {/* <div className={styles[`remember-me`]}>
                            <input type="checkbox"  {...loginRegister("rememberMe")} />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div> */}
                        <button type="submit" className={styles[`btn`]}>Login</button>
                    </form>
                ) : (
                    <form  className={`${styles[`form-content`]}${styles[`RegForm`]}`} onSubmit={handleSignupSubmit(handleRegister)} noValidate>
                        <input style={{"width":"100%","height":"10%"}} type="text" placeholder="Username" {...signupRegister("username", {
                            required: { value: true, message: "Username is Required" },
                            minLength: { value: 6, message: "Username must contain at least 6 characters" }
                        })} autoComplete="off" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                        <p className={styles[`error`]}>{signupErrors.username?.message}</p>

                        <div className={styles[`form-control`]}>
                            <input type="password" placeholder="Password" {...signupRegister("password", {
                                required: { value: true, message: "Password is Required" },
                                minLength: { value: 8, message: "Password must contain at least 8 characters" }
                            })} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                            <p className={styles[`error`]}>{signupErrors.password?.message}</p>
                        </div>
                        <div className={styles[`terms`]}>
                            {/* <div className={styles[`terms-1`]}>
                                <input type="checkbox"  {...signupRegister("terms", {
                                    validate:validateTerms
                                })} />
                                <label htmlFor="terms">I agree to Terms and Conditions</label>
                            </div> */}
                            <div className={styles[`terms-2`]}>
                                <p className={styles[`error`]}>{signupErrors.terms?.message}</p>
                            </div>
                        </div>
                        <button type="submit" className={styles[`btn`]}>Register</button>
                    </form>
                )}
            </div>
            </div>
        </div>
    );
};

export default Login;
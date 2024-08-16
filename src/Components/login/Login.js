import React, { useState, useEffect } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [isLogin, setIsLogin] = useState(true);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

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
            alert('Login successful');
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
        <div className="account-page">
            <div className='form-background'>
                <h1>My Account</h1>
            </div>
            <div className='container'>
            <div className="form-container">
                <input type="radio" name="toggle" id="login" className="toggle-radio" checked={isLogin} onChange={() => setIsLogin(true)} />
                <input type="radio" name="toggle" id="signup" className="toggle-radio" checked={!isLogin} onChange={() => setIsLogin(false)} />
                <div className="form-btn">
                    <label htmlFor="login" className="toggle-label login-label">Login</label>
                    <label htmlFor="signup" className="toggle-label signup-label">Sign-up</label>
                    <div id="Indicator"></div>
                </div>

                {isLogin ? (
                    <form id="LoginForm" className="form-content" onSubmit={handleLoginSubmit(onLogin)} noValidate>
                        <div className='input-box'>
                            <input type="text" placeholder="Username" {...loginRegister("username", {
                                required: { value: true, message: "Username is Required" },
                                minLength: { value: 6, message: "Username must contain at least 6 characters" }
                            })} autoComplete="off" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                            <p className='error'>{loginErrors.username?.message}</p>
                        </div>
                        <input type="password" placeholder="Password" {...loginRegister("password", {
                            required: { value: true, message: "Password is Required" },
                            minLength: { value: 8, message: "Password must contain at least 8 characters" }
                        })} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <p className='error'>{loginErrors.password?.message}</p>
                        <div className="remember-me">
                            <input type="checkbox" id="rememberMe" {...loginRegister("rememberMe")} />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                ) : (
                    <form id="RegForm" className="form-content" onSubmit={handleSignupSubmit(handleRegister)} noValidate>
                        <input type="text" placeholder="Username" {...signupRegister("username", {
                            required: { value: true, message: "Username is Required" },
                            minLength: { value: 6, message: "Username must contain at least 6 characters" }
                        })} autoComplete="off" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                        <p className='error'>{signupErrors.username?.message}</p>

                        <div className='form-control'>
                            <input type="password" placeholder="Password" {...signupRegister("password", {
                                required: { value: true, message: "Password is Required" },
                                minLength: { value: 8, message: "Password must contain at least 8 characters" }
                            })} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                            <p className='error'>{signupErrors.password?.message}</p>
                        </div>
                        <div className="terms">
                            <div className='terms-1'>
                                <input type="checkbox" id="terms" {...signupRegister("terms", {
                                    validate:validateTerms
                                })} />
                                <label htmlFor="terms">I agree to Terms and Conditions</label>
                            </div>
                            <div className='terms-2'>
                                <p className='error'>{signupErrors.terms?.message}</p>
                            </div>
                        </div>
                        <button type="submit" className="btn">Register</button>
                    </form>
                )}
            </div>
            </div>
        </div>
    );
};

export default Login;
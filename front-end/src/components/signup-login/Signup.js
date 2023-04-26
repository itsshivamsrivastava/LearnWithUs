import React, { useState } from 'react';
import './Signup.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5000/api/auth/createuser", {
            fullname: fullname,
            phone: phone,
            email: email,
            gender: gender,
            password: password,
            confirmPassword: confirmPassword,
            profilePhoto: profilePhoto
        }).then((response) => {
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            }
            else {
                document.location.href = "/signup";
                setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            }
        });
    };

    const login = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:5000/api/auth/login", {
            email: email,
            password: password,
        }).then((response) => {
            sessionStorage.setItem("authToken", response.data.authToken);
            document.location.href = "/UserProfile";
        }).catch((err) => {
            console.log(err);
            setLoginStatus("Please try to login with correct credentials");
        });
    };

    return (
        <>
            <div className="body">
                <div className="my-container">
                    <input type="checkbox" id="flip" />
                    <div className="cover">
                        <div className="front">
                            <img src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=667&amp;q=80" alt="login" />
                        </div>
                        
                        <div className="back">
                        </div>
                    </div>
                    <div className="forms">
                        <div className="form-content">
                            <div className="login-form">
                                <div className="title">Login</div>
                                <form action="/login">
                                    <div className="input-boxes">
                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <input type="email" placeholder='Enter your Email' onChange={(e) => { setEmail(e.target.value) }} required />
                                        </div>
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" name='password' placeholder='Enter your Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                        </div>
                                        <div id="emailHelp" className="form-text">Must be 8-20 characters long.</div>
                                        <div className="my-3 text"><Link to="#">Forgot password?</Link></div>
                                        <div className="button input-box">
                                            <input type="submit" onClick={login} value="Login" />
                                        </div>
                                        <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Sigup now</label></div>

                                        <h1 style={{ color: '#7d2ae8', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
                                    </div>
                                </form>
                            </div>
                            <div className="signup-form">
                                <div className="title">Signup</div>
                                <form action="#">
                                    <div className="input-boxes">
                                        <div className="input-box">
                                            <i className="fas fa-user"></i>
                                            <input type="text" onChange={(e) => { setFullname(e.target.value) }} name='fullname' placeholder='Enter your First Name' required />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" onChange={(e) => { setPhone(e.target.value) }} name='phone' placeholder='Enter your phone no' required />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" onChange={(e) => { setEmail(e.target.value) }} name='email' placeholder='Enter your Email' required />
                                        </div>

                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <select name='gender' onChange={(e) => { setGender(e.target.value) }} aria-label=".form-select-lg example">
                                                <option>Select your gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>

                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" onChange={(e) => { setPassword(e.target.value) }} name='password' placeholder='Enter your Password' required />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type="text" onChange={(e) => { setConfirmPassword(e.target.value) }} name='confirmPassword' placeholder='Enter your confirm password' required />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type="text" onChange={(e) => { setProfilePhoto(e.target.value) }} name='profilePhoto' placeholder='Enter your profile photo link' required />
                                        </div>
                                        <div className="button input-box">
                                            <input type="submit" value="Signup" onClick={register} />
                                        </div>

                                        <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                                        <h1 style={{ color: '#7d2ae8', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
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

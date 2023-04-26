import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const navigate = useNavigate();

    const login = () => {
        if (document.getElementById('username').value === "admin" && document.getElementById('password').value === "admin") {
            alert("Login successfully");
            navigate('/courseDashboard');
            // window.location.href = "/admin";
        }
        else {
            alert("Login failed");
        }
    };

    return (
        <>
            <div className="my-admin-container container">
                <h1 className="myheading mb-4">Admin Panel</h1>
                <form className=''>
                    {/* <!-- Email input --> */}
                    <div className="input-box form-outline mb-4">
                        <label className="form-label" htmlFor="username">Email address</label>
                        <input type="email" id="username" className="form-control" />
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="input-box form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" />
                    </div>

                    {/* <!-- 2 column grid layout for inline styling --> */}
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            {/* <!-- Checkbox --> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div className="col">
                            {/* <!-- Simple link --> */}
                            <Link to="#!">Forgot password?</Link>
                        </div>
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="button" className="login-btn mb-4" onClick={login}>Sign in</button>

                    {/* <!-- Register buttons --> */}
                    <div className="text-center">
                        {/* <p>Not a member? <Link to="#!">Register</Link></p> */}
                        {/* <p>or sign up with:</p> */}
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin

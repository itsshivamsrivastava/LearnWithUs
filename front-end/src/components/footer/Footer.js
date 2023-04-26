import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
                <footer className="text-center text-lg-start" style={{ backgroundColor: '#7d2ae8' }}>
                    <div className="container d-flex justify-content-center py-5">
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
                            <i className="fab fa-youtube"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
                            <i className="fab fa-instagram"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456' }}>
                            <i className="fab fa-twitter"></i>
                        </button>
                    </div>

                    <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2023 Copyright:
                        <Link className="text-white" to="/">learnwithus.com</Link>
                    </div>
                </footer>
        </>
    )
}

export default Footer

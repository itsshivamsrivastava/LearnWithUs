import React, {useEffect, useState} from 'react';
import './Home.css';
import headerImage from './Home_Page_Header_Image.png';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Home() {

    const [setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCourses = async () => {
        try {
            await Axios.get('http://localhost:5000/api/courses/getcourses')
            .then(response => {
                setCourses(response.data);
            })
        } catch (error) {
            console.log(`Internal Server Error: ${error}`);
        }
    };

    return (
        <>
            <div className="home-container mx-5">
                <div className="my-header">
                    <div className="my-header-left-side flex">
                        <div className="left-side-header-container container">
                            <h1 className="text-5xl font-semibold">Welcome to the <span style={{ color: 'blueviolet' }}>LearnWithUs</span></h1>
                            <div className="typewriter">
                                <span className="mt-2 text-gray-600" style={{ fontSize: '2rem', fontWeight: '400' }}>Learn to code with us</span>
                            </div>
                            <div className="container">
                            <Link to="/courses" className="home1-btn mt-5">Free Courses</Link>
                            <Link to="#" className="home2-btn mx-4 mt-5">Explore Blogs</Link>
                            </div>
                            <p className="header-para">Confused on which course to take? I have got you covered. Browse courses and find out the best course for you. Its free! LearWithUs is my attempt to teach basics and those coding techniques to people in short time which took me ages to learn.</p>
                        </div>
                    </div>

                    <div className="my-header-right-side flex">
                        <div className="w-full">
                            <img src={headerImage} width='630' alt="headerImage" />
                        </div>
                    </div>
                </div>

                <h1 style={{ color: '#7d2ae8', fontSize: '3.2rem', textAlign: 'center', marginTop: '20px' }}>Recommended Courses</h1>
                {/* <!-- Carousel wrapper --> */}
                <div id="carouselMultiItemExample" className="my-5 carousel slide carousel-dark text-center" data-mdb-ride="carousel">

                    {/* <!-- Inner --> */}
                    <div className="carousel-inner py-4">
                        {/* <!-- Single item --> */}
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card mx-4">
                                            <img
                                                src="https://www.codewithharry.com/_next/image/?url=https%3A%2F%2Fcwh-full-next-space.fra1.digitaloceanspaces.com%2Fvideoseries%2Fpython-100-days-of-code-1%2F7wnove7K-ZQ-HD.jpg&w=384&q=75"
                                                className="card-img-top"
                                                alt="Course-thumbnail"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">Python Tutorials - 100 Days of Code</h5>
                                                <p className="card-text">
                                                    Python is one of the most demanded programming languages in the job market. Surprisingly, it is equally easy to learn and master Python. Let's commit our 100 days of code to python!
                                                </p>
                                                <Link to="/courses/python-course" style={{textDecoration: 'none', color: '#ffffff', fontSize: '1.3rem'}} className="signup-btn">Start Watching</Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Card */}
                                    <div className="col-lg-4">
                                        <div className="card mx-4">
                                            <img
                                                src="https://i.ytimg.com/vi/pN6jk0uUrD8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD1xXxHIJkdaMNT7xmkbevbbuvf_w"
                                                className="card-img-top"
                                                alt="Tutorial-thumbnail"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">Namaste JavaScript</h5>
                                                <p className="card-text">
                                                Namaste JavaScript is a pure in-depth JavaScript Course released for Free on Youtube. It will cover the core concepts of JavaScript in detail and everything about how JS works behind the scenes inside the JavaScript engine.
                                                </p>
                                                <Link to="https://www.javascript.info/intro" target='_blank' style={{textDecoration: 'none', color: '#ffffff', fontSize: '1.3rem'}} className="signup-btn">Start Watching</Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Third Card */}
                                    <div className="col-lg-4">
                                        <div className="card mx-4">
                                            <img
                                                src="https://www.codewithharry.com/_next/image/?url=https%3A%2F%2Fcodewithharry.nyc3.cdn.digitaloceanspaces.com%2Fassets%2F2aefee3112fe9273f4d7d13541ab7094.png&w=384&q=75"
                                                className="card-img-top"
                                                alt="Tutorial-thumbnail"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">Java Course for Absolute Beginners</h5>
                                                <p className="card-text">
                                                If you don't know programming and want to start your career by learning Java as your first language, you can start with this course as it is for absolute beginners.
                                                </p>
                                                <Link to="/courses/java-course" target='_blank' style={{textDecoration: 'none', color: '#ffffff', fontSize: '1.3rem'}} className="signup-btn">Start Watching</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Inner --> */}
                    {/* <!-- Controls --> */}
                    <div className="d-flex justify-content-center mb-4 my-5">
                        <button className="carousel-control-prev position-relative" type="button" data-mdb-target="#carouselMultiItemExample" data-mdb-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next position-relative"
                            type="button"
                            data-mdb-target="#carouselMultiItemExample"
                            data-mdb-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                {/* <!-- Carousel wrapper --> */}

            </div>
        </>
    );
}
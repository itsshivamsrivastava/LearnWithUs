import React, { useState, useEffect } from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Courses(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        handleCourses();
    }, []);
    const handleCourses = async () => {
        try {
            await Axios.get("http://localhost:5000/api/courses/getcourses")
                .then((response) => {
                    setData(response.data);
                })
        } catch (error) {
            console.log("Internal Server Error: ", error);
        }
    };

    return (
        <>
            <div className="container my-5">
                <h1 style={{ color: '#7d2ae8', fontSize: '3.3rem', textAlign: 'center', marginTop: '20px' }} className='my-5'> {props.title} </h1>

                <div className="carousel-inner py-4">
                    {/* <!-- Single item --> */}
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                {
                                    data.map((course) => (
                                        <div className="col-lg-4" key={course.courseId}>
                                            <div className="card " style={{ width: '350px', height: '55rem', marginBottom: '3rem', borderRadius: '20px' }}>
                                                <div style={{ borderRadius: '20px', height: '25rem', textAlign: 'center', justifyContent: 'center', margin: 'auto' }}>
                                                    <img
                                                        src={`http://localhost:5000/${course.thumbnail}`}
                                                        className="card-img-top"
                                                        alt="course-thumbnail"
                                                        style={{ borderRadius: '20px', height: '25rem', textAlign: 'center', justifyContent: 'center', margin: 'auto' }}
                                                    />
                                                </div>

                                                <div className="mx-3 card-body">
                                                    <p style={{ fontSize: '1.4rem', marginBottom: '0.7rem', marginTop: '1rem' }}>FREE COURSE</p>
                                                   
                                                    <h5 className="card-title" style={{ textAlign: 'justify', fontSize: '1.8rem' }}>{course.courseTitle}</h5>
                                                    <p className="card-text" style={{ textAlign: 'justify', fontSize: '1.3rem' }}>{course.courseDesc}</p>
                                                    
                                                </div>
                                                <Link to={`/courses/${course.courseSlug}`} className="course-btn mb-4 mx-4" >Start Watching</Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Inner --> */}
            </div>
        </>
    );
}
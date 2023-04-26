import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import Axios from 'axios';

const CourseSideBar = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        handleCourseTitle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetching courses
    const handleCourseTitle = async () => {
        try {
            await Axios.get("http://localhost:5000/api/courses/getcourses")
                .then((response) => {
                    setCourses(response.data);
                })
        } catch (error) {
            setCourses("Internal Server Error!");
            console.log("Internal Server Error: ", error);
        }
    };

    return (
        <>
            <div className="recommanded-card">
                <h1 className="heading-aside card-title"> <b> Recommanded Courses </b> </h1>
                {
                    courses.map((course) => {
                        return (
                            <p key={course._id} className="courseSideBar card-text mx-4">
                                <Link className='side-bar-title' onClick={()=>{document.location.href = `/courses/${course.courseSlug}`}}>
                                    {course.courseTitle}
                                </Link>
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CourseSideBar;

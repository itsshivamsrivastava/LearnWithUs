import React from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';

const CourseItem = (props) => {
    const { course } = props;
    
    return (
        <div className="course-container container">
            <iframe className='iframe-box' src={course.courseLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className='mx-2 flex flex-wrap'>
                <h1 className='course-title mt-5'> {course.courseTitle} </h1>
                <p className='course-para'> {course.courseContent} </p>
                
                <Link to={`${course.courseNotesLink}`} className='course-btn'>Download Notes</Link>
            </div>
        </div>
    )
}

export default CourseItem;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function AddCourse() {
    const [courseId, setCourseId] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [courseContent, setCourseContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [courseSlug, setCourseSlug] = useState("");
    const [courseLink, setCourseLink] = useState("");
    const [courseNotesLink, setCourseNotesLink] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");


    const addCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("courseId", +courseId);
        formData.append("courseTitle", courseTitle);
        formData.append("courseDesc", courseDesc);
        formData.append("courseContent", courseContent);
        formData.append("thumbnail", thumbnail);
        formData.append("courseSlug", courseSlug);
        formData.append("courseLink", courseLink);
        formData.append("courseNotesLink", courseNotesLink);
        console.log(formData);
        await Axios.post("http://localhost:5000/api/courses/addcourse", formData)
            .then((response) => {
                console.log(response.data);
                setUploadStatus("Course Uploaded Successfully");
            })
            .catch((error) => {
                console.log("Internal Server Error: ", error);
            });
    };

    return (
        <>
            <div style={{ width: '70%' }} className="container my-5">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto"></div>
                    <h1 style={{ color: '#7d2ae8', fontSize: '3rem', marginBottom: '20px', marginTop: '20px' }}>Add Course</h1>
                    <Link to="/courseDashboard" type='button' className="mx-2 tut-btn" style={{ width: '13rem', fontSize: '1.4rem' }}>Dashboard Home</Link>

                    <Link to="/tutorialDashboard" type='button' className="mx-4 tut-btn" style={{ width: '13rem', fontSize: '1.4rem' }}>Tutorial Dashboard</Link>

                    <Link to="/bookDashboard" type='button' className="mx-4 tut-btn" style={{ width: '13rem', fontSize: '1.4rem' }}>Bookshelf</Link>

                    <hr className='my-5' />
                    <div className="mx-auto">
                        <form className='forms form-content'>
                            <label htmlFor="courseid">Course ID</label>
                            <input className='py-4' type="text" name="courseId" id="courseid" placeholder='Course id' onChange={(e) => { setCourseId(e.target.value) }} required />

                            <label htmlFor="coursetitle">Course Title</label>
                            <input className='py-4' type="text" name="courseTitle" id="coursetitle" placeholder='Course Title' required onChange={(e) => { setCourseTitle(e.target.value) }} />

                            <label htmlFor="courseslug">Course Slug</label>
                            <input className='py-4' type="text" name="courseSlug" id="courseslug" placeholder='Course Slug' required onChange={(e) => { setCourseSlug(e.target.value) }} />

                            <label htmlFor="courseimage">Course Thumbnail</label>
                            <input className='py-4' type="file" name="file" id="file" onChange={(e)=>setThumbnail(e.target.files[0])} />

                            <label htmlFor="courselink">Course Link</label>
                            <input className='py-4' type="text" name="courseLink" id="courselink" placeholder='Course Link' required onChange={(e) => { setCourseLink(e.target.value) }} />

                            <label htmlFor="coursenoteslink">Course Notes Link</label>
                            <input className='py-4' type="text" name="courseNotesLink" id="coursenoteslink" placeholder='Course Notes Link' required onChange={(e) => { setCourseNotesLink(e.target.value) }} />

                            <label className='mb-3' htmlFor="coursedesc">Course Description</label>
                            <textarea className='px-4 py-4' name="courseDesc" id="coursedesc" cols="80" rows="5" placeholder='Please enter the description' required onChange={(e) => { setCourseDesc(e.target.value) }} ></textarea>

                            <label className='mx-2 mb-3' htmlFor="coursecontent">Course Content</label>
                            <textarea className='px-4 py-4' name="courseContent" id="coursecontent" cols="80" rows="10" placeholder='Please enter the content' required onChange={(e) => setCourseContent(e.target.value)}></textarea>
                            <button className="tut-btn mx-5 my-5" onClick={addCourse}>Add Course</button>

                            <div>
                                <h1 style={{ color: '#7d2ae8', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{uploadStatus}</h1>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
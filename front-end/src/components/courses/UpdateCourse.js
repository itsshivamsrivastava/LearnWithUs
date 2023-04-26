import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseContent, setCourseContent] = useState("");
  // const [courseImage, setCourseImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [courseNotesLink, setCourseNotesLink] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const { urlCourseSlug } = useParams();
  const [courseData, setCourseData] = useState("");
  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourse = () => {
    Axios.get(`http://localhost:5000/api/courses/getcourse/${urlCourseSlug}`)
      .then((response) => {
        setCourseData(response.data);
      })
  };

  const manageCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("courseTitle", courseTitle);
    formData.append("courseDesc", courseDesc);
    formData.append("courseContent", courseContent);
    formData.append("courseSlug", courseSlug);
    formData.append("courseLink", courseLink);
    formData.append("thumbnail", thumbnail);
    formData.append("courseNotesLink", courseNotesLink);

    await Axios.put(`http://localhost:5000/api/courses/updatecourse/${urlCourseSlug}`, formData)
      .then((response) => {
        console.log(response.data);
        setUploadStatus("Course Uploaded Successfully");
      })
      .catch((error) => {
        console.log("Internal Server Error: ", error);
      }
    );
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h1>Basic Actions</h1>
            <Link to="/courseDashboard" type='button' className="mx-5 tut-btn" style={{ width: '13rem' }}>Dashboard Home</Link>
            <Link to="/logout" type='button' className="tut-btn mx-5">Logout</Link>

            <h1 className='my-5'>Edit Tutorials</h1>
            <form action="" className='forms form-content'>
              <label htmlFor="courseId">Course Id</label>
              <input type="text" name="courseId" id="courseId" placeholder='Course Id' onChange={(e) => { setCourseId(e.target.value) }} defaultValue={courseData.courseId} required />

              <label htmlFor="title">Course Title</label>
              <input type="text" name="courseTitle" id="title" placeholder='Course Title' onChange={(e) => { setCourseTitle(e.target.value) }} defaultValue={courseData.courseTitle} required />

              <label htmlFor="slug">Slug</label>
              <input type="text" name="courseSlug" id="slug" placeholder='Course Slug' onChange={(e) => { setCourseSlug(e.target.value) }} defaultValue={courseData.courseSlug} required />

              <label htmlFor="thumbnail">Course Thumbnail</label>
              <input className='py-4' type="file" name="file" id="file" onChange={(e)=>setThumbnail(e.target.files[0])} required />

              <label htmlFor="link">Course Link</label>
              <input type="text" name="courseLink" id="link" placeholder='Course Link' onChange={(e) => { setCourseLink(e.target.value) }} defaultValue={courseData.courseLink} required />

              <label htmlFor="notes">Course Notes Link</label>
              <input type="text" name="courseNotesLink" id="notes" placeholder='Course Notes Link' onChange={(e) => { setCourseNotesLink(e.target.value) }} defaultValue={courseData.courseNotesLink} required />

              <label htmlFor="desc">Course Description</label>
              <textarea name="courseDesc" id="desc" cols="80" rows="10" onChange={(e) => { setCourseDesc(e.target.value) }} defaultValue={courseData.courseDesc} required></textarea>
              
              <label htmlFor="content">Course Content</label>
              <textarea name="courseContent" id="content" cols="80" rows="10" onChange={(e) => { setCourseContent(e.target.value) }} defaultValue={courseData.courseContent} required></textarea>
              <button className="tut-btn ms-5 my-5" onClick={manageCourse}>Update</button>

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

export default UpdateCourse;

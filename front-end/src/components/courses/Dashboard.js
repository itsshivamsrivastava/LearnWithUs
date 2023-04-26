import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState('');
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };

  return (
    <>
      <h1 className='heading'>Course Dashboard</h1>
      <div className="container">
        <div className="col-lg-8 col-md-10 mx-auto">
          <h1>Basic Actions</h1>
          <Link className="dashboardBtn" to="/editCourse/0"><button className="tut-btn mx-4">Add Course</button></Link>
          <Link to="/tutorialDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Tutorial Dashboard</button></Link>
          <Link to="/notesDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Notes Dashboard</button></Link>
          <Link to="/bookDashboard"><button className="tut-btn mx-4">Bookshelf</button></Link>
          <button className="tut-btn mx-4" onClick={logout}>Log Out</button>
          <hr />
          <br />
          <h1>Add Courses</h1> <br />

          <h3 style={{ color: 'green', fontSize: '1.7rem', marginTop: '20px' }}>{deleteStatus}</h3>

          {/* Responsive Table */}
          <div className="table-responsive mb-5">
            <table style={{ textAlign: 'justify' }} className="course-table table table-striped">
              <thead>
                <tr style={{textAlign: 'center'}}>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Description</th>
                  <th scope="col">Thumbnail</th>
                  <th scope="col">Course Notes</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {
                  data.map((course) => (
                    <tr key={course.courseId}>
                      <th scope="row">{course.courseId}.</th>
                      <td>{course.courseTitle}</td>
                      <td>{course.courseSlug}</td>
                      <td style={{ textAlign: 'justify' }}>{course.courseDesc}</td>
                      <td>{
                        course.courseThumbnail === null ? "No Thumbnail" : <img src={`http://localhost:5000/${course.thumbnail}`} alt="course thumbnail" style={{ width: '70px', height: '50px' }} />
                        }</td>
                      <td>{
                        course.courseNotesLink === null ? "No Notes" : `${course.courseTitle} Notes`
                        }</td>
                      <td>
                        <Link to={`/updateCourse/${course.courseSlug}`}>
                          <button className="tut-btn mx-3 my-3">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="tut-btn mx-3 my-3"
                          onClick={
                            async () => {
                              try {
                                await Axios.delete(`http://localhost:5000/api/courses/deletecourse/${course.courseSlug}`)
                                  .then((response) => {
                                    console.log(response.data);
                                    setDeleteStatus("Course Deleted Successfully");
                                  })
                              } catch (error) {
                                console.log("Internal Server Error: ", error);
                              }
                            }
                          }
                        >
                          Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard;

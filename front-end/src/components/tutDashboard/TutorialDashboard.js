import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import './TutorialDashboard.css';

export default function TutorialDashboard() {

    const [data, setData] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        handleTutorials();
    }, []);

    const handleTutorials = async () => {
        try {
            await Axios.get("http://localhost:5000/api/tutorials/fetchtutorials")
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
            {/* <!-- Main Content--> */}
            <div className="container">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <h1>Basic Actions</h1>
                    <Link className="dashboardBtn" to="/tutEdit/0"><button className="tut-btn mx-4">Add Tutorials</button></Link>
                    <Link to="/courseDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Course Dashboard</button></Link>
                    <Link to="/notesDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Notes Dashboard</button></Link>
                    <Link to="/bookDashboard"><button className="tut-btn mx-4">Bookshelf</button></Link>
                    <button className="tut-btn mx-5" onClick={logout}>Logout</button>
                    <hr />
                    <br />
                    <h1>Edit Posts</h1> <br />
                    <h3 style={{ color: 'green', fontSize: '1.7rem', marginTop: '20px' }}>{deleteStatus}</h3>
                    {/* Table */}
                    <table className="my-table mb-5 table table-striped">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Tutorial Link</th>
                                <th scope="col">Tags</th>
                                <th scope="col">Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((tut) => (
                                <tr key={tut._id}>
                                    <th scope="row">{tut._id}</th>
                                    <td>{tut.title}</td>
                                    <td>{tut.slug}</td>
                                    <td>{
                                        tut.category === null ? <p>Not Available</p> : <a href={tut.category} target="_blank" rel="noreferrer">{tut.title}</a>
                                    }</td>
                                    <td>{tut.tags}</td>
                                    <td> {
                                        tut.image === null ? <p>Not Available</p> : <img src={tut.image} alt="tutorial" style={{ width: '40px', height: '40px' }} />
                                    } </td>
                                    <td><Link to={`/editTutorial/${tut.slug}`} className="tut-btn mx-2">Edit</Link></td>
                                    <td><button className="tut-btn mx-2" onClick={
                                        async () => {
                                            try {
                                                await Axios.delete(`http://localhost:5000/api/tutorials/deletetutorial/${tut.slug}`)
                                                    .then((response) => {
                                                        handleTutorials();
                                                        setDeleteStatus(`${tut.title} Deleted Successfully`);
                                                    })
                                            } catch (error) {
                                                console.log("Internal Server Error: ", error);
                                            }
                                        }
                                    }>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}
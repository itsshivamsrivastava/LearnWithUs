import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './Notes.css';

const NotesDashboard = () => {

    const [data, setData] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        handleNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNotes = async () => {
        try {
            await Axios.get("http://localhost:5000/api/notes/fetchnotes")
                .then((response) => {
                    // console.log(response.data)
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
            <div className="container my-5">
            <h1 className='heading'>Notes Dashboard</h1>
                <div className="col-lg-8 col-md-10 mx-auto">
                    <h1>Basic Actions</h1>
                    <Link className="dashboardBtn" to="/addNotes/0"><button className="tut-btn mx-4">Add Notes</button></Link>
                    <Link to="/courseDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Course Dashboard</button></Link>
                    <Link to="/tutorialDashboard"><button className="tut-btn mx-4" style={{ width: '13rem' }}>Tutorial Dashboard</button></Link>
                    <Link to="/bookDashboard"><button className="tut-btn mx-4">Bookshelf</button></Link>
                    <button className="tut-btn mx-5" onClick={logout}>Logout</button>
                    <hr />
                    <br />
                    <h1>Add Notes</h1> <br />
                    <h3 style={{ color: 'green', fontSize: '1.7rem', marginTop: '20px' }}>{deleteStatus}</h3>
                    {/* Table */}
                    <div className="table-responsive">
                    <table className="notes-table table table-striped">
                        <thead>
                            <tr style={{textAlign: 'center'}}>
                                <th scope="col">Notes Title</th>
                                <th scope="col">Notes Slug</th>
                                <th scope="col">Notes Thumbnail</th>
                                <th scope="col">PDF Notes</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((note) => (
                                    <tr key={note.notesSlug}>
                                        <td> {note.notesTitle} </td>
                                        <td> {note.notesSlug} </td>
                                        <td>{
                                            note.notesThumbnail === null ? "No Thumbnail" : <img src={note.notesThumbnail} alt="Thumbnail" style={{ width: '40px', height: '40px' }} />
                                            }</td>
                                        <td>{
                                            note.notesPDF === null ? "No PDF" : `${note.notesTitle} PDF`
                                            }</td>
                                        <td><Link to={`/notesEdit/${note.notesSlug}`} className="tut-btn mx-2">Edit</Link></td>
                                        <td><button 
                                        className="tut-btn mx-2"
                                        onClick={
                                            async () => {
                                                try {
                                                    await Axios.delete(`http://localhost:5000/api/notes/deletenotes/${note.notesSlug}`)
                                                    .then((response) => {
                                                        handleNotes();
                                                        setDeleteStatus(`${note.notesTitle} Deleted Successfully`);
                                                    })
                                                } catch (error) {
                                                    console.log("Internal Server Error: ", error);
                                                }
                                            }
                                        }
                                        >
                                            Delete
                                        </button>
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

export default NotesDashboard;

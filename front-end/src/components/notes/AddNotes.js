import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddNotes () {

    const [notesTitle, setNotesTitle] = useState("");
    const [notesSlug, setNotesSlug] = useState("");
    const [notesThumbnail, setNotesThumbnail] = useState("");
    const [notesPdf, setNotesPdf] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");

    const addNotes = async (e) => {
        e.preventDefault();
        const notesData = {
            notesTitle: notesTitle,
            notesSlug: notesSlug,
            notesThumbnail: notesThumbnail,
            notesPdf: notesPdf
        };
        console.log("Before calling API: ", notesData);

        await Axios.post("http://localhost:5000/api/notes/addnotes", notesData)
            .then((response) => {
                console.log(response.data);
                setUploadStatus("Notes Uploaded Successfully");
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

                    <Link to="/notesDashboard" type='button' className="mx-4 tut-btn" style={{ width: '13rem', fontSize: '1.4rem' }}>Notes Dashboard</Link>

                    <Link to="/bookDashboard" type='button' className="mx-4 tut-btn" style={{ width: '13rem', fontSize: '1.4rem' }}>Bookshelf</Link>

                    <hr className='my-5' />
                    <div className="mx-auto">
                        <form className='forms form-content'>
                            <h3 style={{ color: 'green', fontSize: '1.7rem', marginTop: '20px' }}>{uploadStatus}</h3>
                            <label htmlFor="notesTitle">Note Title</label>
                            <input className='py-4' type="text" name="notesTitle" id="notesTitle" placeholder='Note Title' required onChange={(e) => { setNotesTitle(e.target.value) }} />

                            <label htmlFor="notesSlug">Note Slug</label>
                            <input className='py-4' type="text" name="notesSlug" id="notesSlug" placeholder='Note Slug' required onChange={(e) => { setNotesSlug(e.target.value) }} />

                            <label htmlFor="notesThumbnail">Note Thumbnail</label>
                            <input className='py-4' type="text" name="notesThumbnail" id="notesThumbnail" placeholder='Note Thumbnail' required onChange={(e) => { setNotesThumbnail(e.target.value) }} />

                            <label htmlFor="notesPdf">Note PDF</label>
                            <input className='py-4' type="text" name="notesPdf" id="notesPdf" placeholder='Note PDF' required onChange={(e) => { setNotesPdf(e.target.value) }} />

                            <button type="submit" className="tut-btn my-5" onClick={addNotes}>Add Notes</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


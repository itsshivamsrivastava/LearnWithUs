import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const NotesEdit = () => {
    const [notesTitle, setNotesTitle] = useState("");
    const [notesSlug, setNotesSlug] = useState("");
    const [notesThumbnail, setNotesThumbnail] = useState("");
    const [notesPdf, setNotesPdf] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");

    const { urlNotesSlug } = useParams();
    const [notesData, setNotesData] = useState("");
    useEffect(() => {
        fetchCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCourse = () => {
        Axios.get(`http://localhost:5000/api/notes/fetchnotes/${urlNotesSlug}`)
            .then((response) => {
                console.log(response.data);
                setNotesData(response.data);
            })
    };

    const updateNotes = async (e) => {
        e.preventDefault();

        const notesData = {
            notesTitle: notesTitle,
            notesSlug: notesSlug,
            notesThumbnail: notesThumbnail,
            notesPdf: notesPdf
        };

        await Axios.put(`http://localhost:5000/api/notes/updatenotes/${urlNotesSlug}`, notesData)
            .then((response) => {
                setUploadStatus("Notes Uploaded Successfully");
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
                        <Link to="/notesDashboard" type='button' className="mx-5 tut-btn" style={{ width: '13rem' }}>Dashboard Home</Link>
                        <Link to="/logout" type='button' className="tut-btn mx-5">Logout</Link>

                        <h1 className='my-'>Edit Tutorials</h1>

                        <h1 style={{ color: '#7d2ae8', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{uploadStatus}</h1>
                        
                        <form action="" className='forms form-content'>
                            <label htmlFor="notesTitle">Notes Title</label>
                            <input type="text" name="notesTitle" id="notesTitle" placeholder='Notes Title' onChange={(e) => { setNotesTitle(e.target.value) }} defaultValue={notesData.notesTitle} required />

                            <label htmlFor="notesSlug">Notes Slug</label>
                            <input type="text" name="notesSlug" id="notesSlug" placeholder='Notes Slug' onChange={(e) => { setNotesSlug(e.target.value) }} defaultValue={notesData.notesSlug} required />

                            <label htmlFor="notesThumbnail">Notes Thumbnail</label>
                            <input type="text" name="notesThumbnail" id="notesThumbnail" placeholder='Notes Thumbnail' onChange={(e) => { setNotesThumbnail(e.target.value) }} defaultValue={notesData.notesThumbnail} required />

                            <label htmlFor="notesPdf">Notes PDF</label>
                            <input className='py-4' type="text" name="notesPdf" id="notesPdf" onChange={(e) => setNotesPdf(e.target.value)} defaultValue={notesData.notesPdf} required />

                            <button className="tut-btn ms-5 my-5" onClick={updateNotes}>Update</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesEdit;

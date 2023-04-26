import React, {useState, useEffect} from 'react';
import './Notes.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Notes() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchNotes = () => {
        Axios.get("http://localhost:5000/api/notes/fetchnotes")
            .then((response) => {
                setNotes(response.data);
            })
    };

    return (
        <>
            <div className="container my-5">
                <h1 className='heading my-5'>Download Free Notes</h1>

                {/* <!-- Carousel wrapper --> */}
                <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">

                    {/* <!-- Inner --> */}
                    <div className="carousel-inner py-4">
                        {/* <!-- Single item --> */}
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4" style={{display: 'contents'}}>
                                        {notes.map((note)=>(
                                        
                                        <div key={note.notesSlug} className="card mx-4 my-4" style={{ width: '250px' }}>
                                            <img src={note.notesThumbnail} className="card-img-top my-4 mt-5" alt="Tutorial-thumbnail" style={{ height: '150px', width: '150px', textAlign: 'center', justifyContent: 'center', margin: 'auto' }} />
                                            <div className="card-body">
                                                <h3 className="card-title" style={{ textAlign: 'center', }}>{note.notesTitle}</h3>
                                                <span className="card-text" style={{ textAlign: 'center', fontSize: '1.5rem', color: 'rgb(107 114 128)' }}>Download Notes Here</span>
                                                <Link to={note.notesPdf} target='_blank' className="my-3 tut-btn">PDF Notes</Link>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
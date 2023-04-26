import React, { useState, useEffect } from 'react';
import './TutEdit.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditTutorial = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    const [image, setImage] = useState("");
    const [tutorialData, setTutorialData] = useState("");
    const { urlslug } = useParams();
    
    const fetchTutorial = () => {
        Axios.get(`http://localhost:5000/api/tutorials/fetchtutorials/${urlslug}`)
            .then((response) => {
                setTutorialData(response.data[0]);
            })
    };
    useEffect(() => {
        fetchTutorial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTutorial = async (e) => {
        e.preventDefault();
        const tutorialData = {
            title: title,
            slug: slug,
            content: content,
            category: category,
            tags: tags,
            image: image
        };
        await Axios.put(`http://localhost:5000/api/tutorials/updatetutorial/${urlslug}`, tutorialData)
            .then((response) => {
                setUploadStatus("Tutorial Updated Successfully");
            })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <h1>Basic Actions</h1>
                        <Link to="/tutorialDashboard" type='button' className="mx-5 tut-btn" style={{ width: '13rem' }}>Dashboard Home</Link>
                        <Link to="/logout" type='button' className="tut-btn mx-5">Logout</Link>

                        <h1 className='my-5'>Edit Tutorials</h1>
                        <form action="" className='forms form-content'>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="tutTitle" id="title" placeholder='Tutorial Title' onChange={(e) => { setTitle(e.target.value) }} defaultValue={tutorialData.title} required />

                            <label htmlFor="slug">Slug</label>
                            <input type="text" name="tutSlug" id="slug" placeholder='Tutorial Slug' onChange={(e) => { setSlug(e.target.value) }} defaultValue={tutorialData.slug} required />

                            <label htmlFor="category">Tutorial Link</label>
                            <input type="text" name="tutCategory" id="category" placeholder='Tutorial Category' onChange={(e) => { setCategory(e.target.value) }} defaultValue={tutorialData.category} required />

                            <label htmlFor="tags">Tags</label>
                            <input type="text" name="tutTags" id="tags" placeholder='Tutorial Tags' onChange={(e) => { setTags(e.target.value) }} defaultValue={tutorialData.tags} required />

                            <label htmlFor="image">Image</label>
                            <input type="text" name="tutImage" id="image" placeholder='Tutorial Image' onChange={(e) => { setImage(e.target.value) }} defaultValue={tutorialData.image} required />

                            <label htmlFor="desc">Description</label>
                            <textarea name="tutDesc" id="tutDesc" className='desc' cols="80" rows="10" onChange={(e) => { setContent(e.target.value) }} defaultValue={tutorialData.content} required></textarea>

                            <button className="tut-btn ms-5 my-5" onClick={updateTutorial}>Update</button>

                            <div>
                                <h1 style={{ color: '#7d2ae8', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{uploadStatus}</h1>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTutorial;

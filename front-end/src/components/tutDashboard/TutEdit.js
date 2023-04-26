import { React, useState } from 'react';
import './TutEdit.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function TutEdit() {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");

    const addTutorial = async (e) => {
        e.preventDefault();
        const tutorialData = {
            title: title,
            slug: slug,
            content: content,
            category: category,
            tags: tags,
            image: image
        };

        await Axios.post("http://localhost:5000/api/tutorials/addtutorial", tutorialData)
            .then((response) => {
                setUploadStatus("Tutorial Uploaded Successfully");
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

                        <h1 className='my-5'>Add Tutorial</h1>
                        <form className='forms form-content'>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="tutTitle" id="title" placeholder='Tutorial Title' onChange={(e) => { setTitle(e.target.value) }} required />

                            <label htmlFor="slug">Slug</label>
                            <input type="text" name="tutSlug" id="slug" placeholder='Tutorial Slug' onChange={(e) => { setSlug(e.target.value) }} required />

                            <label htmlFor="category">Category</label>
                            <input type="text" name="tutCategory" id="category" placeholder='Tutorial Category' onChange={(e) => { setCategory(e.target.value) }} required />

                            <label htmlFor="tags">Tags</label>
                            <input type="text" name="tutTags" id="tags" placeholder='Tutorial Tags' onChange={(e) => { setTags(e.target.value) }} required />

                            <label htmlFor="image">Image</label>
                            <input type="text" name="tutImage" id="image" placeholder='Tutorial Image' onChange={(e) => { setImage(e.target.value) }} required />

                            <label htmlFor="desc">Description</label>
                            <textarea name="tutDesc" id="tutDesc" className='desc' cols="80" rows="10" onChange={(e) => { setContent(e.target.value) }} required></textarea>

                            <button className="tut-btn ms-5 my-5" onClick={addTutorial}>Add</button>

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
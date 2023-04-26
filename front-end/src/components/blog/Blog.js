import React, { /*useContext*/ } from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
    const [blogsPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        handleBlogs();
    }, []);

    const handleBlogs = async () => {
        try {
            await Axios.get("http://localhost:5000/api/blogs/fetchallblogs")
                .then((response) => {
                    setBlogPosts(response.data);
                })
        } catch (error) {
            console.log("Internal Server Error: ", error);
        }
    };

    return (
        <>
            <div className="container my-5">
                <h1 style={{ fontSize: '2.7rem', textAlign: 'center' }} className='my-5'>Blogs are upcomming feature...</h1>

                <div className='container' style={{ textAlign: 'justify', width: '97rem', fontSize: '1.8rem' }}>
                    {
                        blogsPosts.map((blog) => (
                            <div key={blog.blog_slug} className='card my-5'>
                                <h1 className="card-title" style={{ textAlign: 'center', fontSize: '3.5rem' }}>
                                    {blog.blog_title}
                                </h1>
                                <p className="card-text my-3" style={{ textAlign: 'justify', fontSize: '1.3rem' }}>
                                    {blog.blog_content}
                                </p>
                                <Link to={`/blog/blogpost/${blog.blog_slug}`}> Read More </Link>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    );
}
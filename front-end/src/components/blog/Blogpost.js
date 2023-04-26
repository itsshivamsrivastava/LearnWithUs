import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
// import Blog from './Blog';
import { Link } from 'react-router-dom';

export default function Blogpost() {
    // Display the single blog post on the page using the user id. login required
    const [blogPost, setBlogPost] = useState([]);

    useEffect(() => {
        console.log("Blogpost Page on page load");
        handleBlogPost();
    }, []);

    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": `${sessionStorage.getItem('authToken')}`,
        },
    };

    const handleBlogPost = async () => {
        try {
            await Axios.get(`http://localhost:5000/api/blogs/fetchalluserblogs/`, config)
                .then((response) => {
                    // console.log("Blogpost Response: ", response)
                    // console.log("Blogpost Title Response: ", response.data[0].blog_title);
                    setBlogPost(response.data);
                })
        } catch (error) {
            console.log("Internal Server Error: ", error);
        }
    };

    const tryData = () => {
        for (var i = 0; i < blogPost.length; i++) {
            if (blogPost[i].blog_slug.slice(0, 6)) {
                console.log("Blogpost Slug: ", blogPost[i].blog_slug);
                console.log(blogPost[i].blog_title.slice(0, 6));

                return (
                    <>
                        <div className="container my-5">
                            <h1 style={{ fontSize: '3.7rem', textAlign: 'center' }} className='my-5'>Blog Post</h1>
                            {
                                blogPost.map((blog) => (
                                    <div key={blog.blog_slug} className='card my-5'>
                                        <h1 className="card-title" style={{ textAlign: 'center', fontSize: '3.5rem' }}>
                                            {blog.blog_title}
                                        </h1>
                                        <p className="card-text my-3" style={{ textAlign: 'justify', fontSize: '1.3rem' }}>
                                            {blog.blog_content}
                                        </p>
                                        <Link to={`blog/${blog.blog_slug}`}>
                                            <button type="button" className="my-button" style={{ marginRight: '3.5rem' }}>
                                                Try Data
                                            </button>
                                        </Link>
                                    </div>
                                ))
                            }

                            {/* <button className="my-button">Try Data</button> */}
                        </div>
                    </>
                );

            }
            else {
                console.log("No Blogpost Slug");
            }
        }
    };


    return (
        <>
            <div className="container my-5">
                <h1 style={{ fontSize: '3.7rem', textAlign: 'center' }} className='my-5'>User's Blogs</h1>
                {
                    blogPost.map((blog) => (
                        <div key={blog.blog_slug} className='card my-5'>
                            <h1 className="card-title" style={{ textAlign: 'center', fontSize: '3.5rem' }}>
                                {blog.blog_title}
                            </h1>
                            <p className="card-text my-3" style={{ textAlign: 'justify', fontSize: '1.3rem' }}>
                                {blog.blog_content}
                            </p>
                        </div>
                    ))
                }
                <button onClick={tryData} className="my-button">Try Data</button>
            </div>
        </>
    );

}

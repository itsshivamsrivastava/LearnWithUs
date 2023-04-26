import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
// import { config } from '../common';

export default function UserProfile() {

    const [userData, setUserData] = useState([]);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        getUserData();
        blog();
    }, []);
    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": `${sessionStorage.getItem('authToken')}`,
        },
    };
    const getUserData = async () => {
        await Axios.get('http://localhost:5000/api/auth/getuser', config)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.log("Internal Server Error: ", error);
            });
    };

    const blog = async () => {
        await Axios.get('http://localhost:5000/api/blogs/fetchalluserblogs', config)
            .then(response => {
                setBlogData(response.data);
            })
            .catch(error => {
                console.log("Internal Server Error: ", error);
            });
    };
    const data = () => {
        for (var i = 0; i < blogData.length; i++) {
            if (blogData[i].blog_slug.slice(0, 5) === blogData[i].blog_slug.slice(0, 5)) {
                console.log("Blogpost Slug: ", blogData[i].blog_slug);
                console.log(blogData[i].blog_title.slice(0, 5));
                return (
                    <>
                        <div className="container my-5">
                            {/* <h1 style={{ fontSize: '3.7rem', textAlign: 'center' }} className='my-5'>User's Blogs</h1> */}
                            {
                                blogData.map((blog) => (
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
                console.log("No blogpost slug found");
            }
        }
    }

    return (
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="profile-box col col-md-9 col-lg-7 col-xl-5">
                        <div className="card" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <img src={userData.profilePhoto}
                                            alt="Generic placeholder image" className="rounded-circle img-fluid"
                                            style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h2 className="mb-1" style={{ marginLeft: '1rem' }}> {userData.fullname} </h2>
                                        <p className="mb-2 pb-1" style={{ color: '#2b2a2a', marginLeft: '1rem' }}> {userData.profileHeadline} </p>
                                        <h5 className="mb-2 pb-1" style={{ color: '#2b2a2a', marginLeft: '1rem' }}> {userData.gender} | {userData.email} </h5>

                                        <div className="d-flex pt-1" style={{ marginTop: '4rem' }}>
                                            <Link to="/bookshelf">
                                                <button type="button" className="my-button" style={{ marginRight: '3.5rem' }}>
                                                    Book
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {
                                    blogData.map((blog) => {
                                        return (
                                            <div key={blog.blog_slug} className="my-4">
                                                <div className="card flex-grow-1 ms-3">
                                                    <Link to={`/blog/${blog.blog_slug}`} onClick={data}>
                                                        <h2 className="mb-1" style={{ marginLeft: '1rem' }}> {blog.blog_title} </h2>
                                                    </Link>
                                                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a', marginLeft: '1rem' }}> {blog.blog_content} </p>

                                                    <Link to={`blog/${blog.blog_slug}`}>
                                                        <button type="button" className="my-button" style={{ marginRight: '3.5rem' }}>
                                                            Read More
                                                        </button>
                                                    </Link>
                                                    <Link to={`/blog/${blog.blog_slug}`} type="button" className="my-button" style={{ marginRight: '3.5rem' }} onClick={data}>
                                                         Read More 
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="my-4" style={{ backgroundColor: 'pink', display: 'flex' }}>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
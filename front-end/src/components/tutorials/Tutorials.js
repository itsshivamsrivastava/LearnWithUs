import React from 'react';
import './Tutorials.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Tutorials() {
    const [data, setData] = useState([]);

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

    return (
        <div className="container my-5">
            <h1 className='my-5 tutorial-heading'>Tutorials</h1>

            {/* <!-- Carousel wrapper --> */}
            <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">

                {/* <!-- Inner --> */}
                <div className="carousel-inner py-4">
                    {/* <!-- Single item --> */}
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                {
                                    data.map((tut) => (
                                        <div className="col-lg-4" key={tut._id}>

                                            <div className="card my-4" style={{ width: '250px' }}>
                                                <img
                                                    src={tut.image}
                                                    className="card-img-top my-4 mt-5"
                                                    alt="Tutorial-thumbnail"
                                                    style={{ height: '150px', width: '150px', textAlign: 'center', justifyContent: 'center', margin: 'auto' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ textAlign: 'center', fontSize: '1.3rem' }}>{tut.title}</h5>
                                                    
                                                    <Link to={`${tut.category}`} target='_blank' className="my-3 tut-btn">Start Learning</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Inner --> */}
                {/* <!-- Controls --> */}
                <div className="d-flex justify-content-center mb-4 my-5">
                    <button className="carousel-control-prev position-relative" type="button" data-mdb-target="#carouselMultiItemExample" data-mdb-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next position-relative"
                        type="button"
                        data-mdb-target="#carouselMultiItemExample"
                        data-mdb-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <!-- Carousel wrapper --> */}

        </div>
    );
}
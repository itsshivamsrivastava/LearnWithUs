import React, { useState, useEffect } from 'react';
import './Tutorial.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        handleTutorialTitle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetching tutorials
    const handleTutorialTitle = async () => {
        try {
            await Axios.get("http://localhost:5000/api/tutorials/fetchtutorials")
                .then((response) => {
                    setData(response.data);
                })
        } catch (error) {
            setData("Internal Server Error!");
            console.log("Internal Server Error: ", error);
        }
    };

    return (
        <>
            <div className="card">
                <h3 className="heading-aside card-title my-3 mx-4"> <b> Recommanded Tutorial </b> </h3>
                {
                    data.map((tut) => {
                        return (
                            <p key={tut._id} className="side-bar card-text mx-4 mb-3">
                                <Link onClick={()=>{document.location.href = `/tutorial/${tut.slug}`}}>
                                    {tut.title}
                                </Link>
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SideBar

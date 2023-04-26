import React from 'react';
import './Tutorial.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import TutorialItem from './TutorialItem';
import SideBar from './SideBar';

export default function Tutorial() {
    const { slug } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        handleTutorial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetching tutorials one by one when the user clicks on the Start Learnin button
    const handleTutorial = async () => {
        try {
            await Axios.get(`http://localhost:5000/api/tutorials/fetchtutorials/${slug}`)
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
            <div className="container" style={{ display: 'flex' }}>
                <aside className='aside-side container my-5'>
                    <SideBar />
                </aside>

                <div className="container my-4">
                    {
                        data.map((tutorial) => {
                            return (<TutorialItem key={tutorial._id} tutorial={tutorial} />)
                        })
                    }
                </div>

            </div >
        </>
    );
}
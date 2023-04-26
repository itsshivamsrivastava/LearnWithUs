import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import CourseItem from './CourseItem';
import CourseSideBar from './CourseSideBar';

export default function Course() {
    const { slug } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchOneCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOneCourse = async () => {
        try {
            await Axios.get(`http://localhost:5000/api/courses/getcourse/${slug}`)
                .then((response) => {
                    setData(response.data);
                })
        } catch (error) {
            setData("Internal Server Error!");
            console.log("Internal Server Error: ", error);
        }
    };

    // // Convert the data to an array
    let courseDataArray = [];
    courseDataArray.push(data);

    return (
        <>

            <div className="container" style={{ display: 'flex' }}>
                <aside className='aside-side container my-5'>
                    <CourseSideBar />
                </aside>

                <div className="container my-4">
                    {
                        courseDataArray.map((course) => {
                            return (<CourseItem key={course._id} course={course} />)
                        })
                    }
                </div>
            </div >
        </>
    )
}

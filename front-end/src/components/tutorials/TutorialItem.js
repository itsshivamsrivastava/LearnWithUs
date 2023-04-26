import React from 'react';

const TutorialItem = (props) => {
    const { tutorial } = props;
    return (
        <div className="col-md-12">
            <div className='card my-4'>
                <div className="card-body">
                    <h1 className="card-title" style={{ textAlign: 'center' }}>{tutorial.title}</h1>
                    <p className="card-text" style={{ textAlign: 'justify', fontSize:'1.5rem' }}>{tutorial.content}</p>
                </div>
            </div>
        </div>
    )
};

export default TutorialItem;
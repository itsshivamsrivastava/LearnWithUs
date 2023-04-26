import React from 'react';
import TutorialContext from './tutorialContext';
import { useState } from 'react';

const TutorialState = (props) => {
    const tutorialsInitial = [
        {
            "_id": "64034b828088a238bb1daff002",
            "title": "Python",
            "slug": "python-tutorial",
            "content": "This is Python tutorial.",
            "tags": "python, programming, tutorial",
            "category": "Python"
        },
        {
            "_id": "64034bd28088a8bb451daff006",
            "title": "Java",
            "slug": "java-tutorial",
            "content": "This is a java tutorial content3. This is tutorial content3 This is tutorial content3 This is tutorial content3. This is tutorial content3. This is tutorial content3 This is tutorial content3 This is tutorial content3. This is tutorial content3. This is tutorial content3 This is tutorial content3 This is tutorial content3.",
            "tags": "java, programming, tutorial",
            "category": "Java"
        }
    ]
    const [tutorials, setTutorials] = useState(tutorialsInitial);

    // Add a tutorial
    const addTutorials = (title, slug, content, tags, category) => {
        // TODO: API call
        console.log("Adding a new tutorial");
        const tutorial = {
            "_id": "64034b828088a238bb1daff002",
            "title": "Python ADDED",
            "slug": "python-tutorial",
            "content": "This is Python tutorial [ADDED]",
            "tags": "python, programming, tutorial",
            "category": "Python"
        };
        setTutorials(tutorials.concat(tutorial))
    }

    // Delete a tutorial
    const deleteTutorial = (id) => {
        console.log("Deleting the tutorial with id" + id);
    }
    // Update a tutorial
    const updateTutorial = () => {
    }

    return (
        <TutorialContext.Provider value={{ tutorials, addTutorials, deleteTutorial, updateTutorial }}>
            {props.children}
        </TutorialContext.Provider>
    )
};

export default TutorialState;
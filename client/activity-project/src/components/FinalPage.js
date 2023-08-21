import React, { useState, useEffect } from 'react'

function FinalPage({ availableBudget, onTakeMeBack }) {

    const [activities, setActivities] = useState([]);


    useEffect(() => {
        async function getFinalList() {
            const response = await fetch('http://localhost:3000/favourites')
            const allActivities = await response.json();
            setActivities(allActivities);
        }
        getFinalList()
    }, [])


    return (
        <div className='outside-container' key='final-page-div'>
            <h2>{availableBudget}</h2>
            <div className='inside-container' key='final-list-div'>
                {activities.map(activity => (
                    <>
                        <h3> Name: {activity.activity}</h3>
                        <p> Accessibility: {activity.accessibility}</p>
                        <p> Type: {activity.type}</p>
                        <p> Participants: {activity.participants} </p>
                        <p> Price: {activity.price * 200} </p>
                    </>
                ))}
            </div>
            <button onClick={() => {onTakeMeBack('List')}}>Back to planning</button>
        </div>
    )
}

export default FinalPage;
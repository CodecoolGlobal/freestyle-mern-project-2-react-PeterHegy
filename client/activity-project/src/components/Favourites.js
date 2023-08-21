import { useEffect, useState } from "react"

function ShowFavourites({OnClickEdit, OnclickBack, onShowFinal, availableBudget,  budget}) {
    const [favActivities, setFavActivities] = useState([])
    const [hasChanges, setHaschanges] = useState('szilvásBuktát')

    useEffect(() => {
        async function fetchFavourites() {
            const response = await fetch('/api/favourites')
            const data = await response.json()
            console.log(data)
            setFavActivities(data)
        }
        fetchFavourites()
    }, [hasChanges])


   function deleteChoosedActivity(del) {
       

        const filteredList = favActivities.filter((act) => act.key !== del)
        console.log(filteredList)
        setFavActivities(filteredList)
        setHaschanges('mertAztSzeretem')

        fetch(`/api/favourites/${del}`, {
            method: 'DELETE',
        })

    }




    return (
        <div className="outside-container">
            <p>{availableBudget}</p>
            <button onClick={() => {OnclickBack('Choosing')}}>Back to choose other type</button>
            {favActivities.map(activity => (
                <div className="inside-container" key={activity.activity}>
                    <h3> Name: {activity.activity}</h3>
                    <p> Accessibility: {activity.accessibility}</p>
                    <p> Type: {activity.type}</p>
                    <p> Participants: {activity.participants} </p>
                    <p> Price: {activity.price * 200} </p>
                    <button onClick={() => { OnClickEdit('Edit', activity) }}>Edit</button>
                    <button onClick={() => { deleteChoosedActivity(activity.key); budget(availableBudget, (activity.price * 200), false) }}>Delete</button>
                </div>
            ))}
            <button onClick={() => {onShowFinal('Final')}}>Show me the finalized list!</button>
        </div>
    )
}

export default ShowFavourites
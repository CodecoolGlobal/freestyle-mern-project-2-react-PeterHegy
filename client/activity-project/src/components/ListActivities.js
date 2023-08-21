const { useEffect, useState } = require("react")


function ListActivities({ choosedType, availableBudget, minimum, maximum, budget, OnclickFavourite, OnclickBack }) {

  const [activities, setActivities] = useState([])



  async function PushActivityToDataBase(obj) {
    console.log(obj)
    try {
      const response = await fetch('http://localhost:3000/activity', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
    }

    catch (error) {
      console.error('something goes wrong', error)
    }

    budget(availableBudget, (obj.price * 200), true)
  }



  useEffect(() => {
    async function getActivities() {
      const arr = []
      for (let i = 0; i <= 15; i++) {
        const response = await fetch(`http://www.boredapi.com/api/activity?type=${choosedType}`)
        const converted = await response.json()
        if (minimum < (converted.price * 200) && maximum > (converted.price * 200)) {
          arr.push(converted)
        }
      }

      const uniqueMap = new Map()
      arr.forEach(element => {
        if (!uniqueMap.has(element.key)) {
          uniqueMap.set(element.key, element)
        }
      });

      const uniqueArray = Array.from(uniqueMap.values())
      setActivities(uniqueArray)

    }
    getActivities()
  }, [])


  return (
    <div>
      <h2>{availableBudget}</h2>
      <button onClick={OnclickFavourite}>Favourites</button>
      <button onClick={() => {OnclickBack('Choosing')}}>Back</button>
      {activities.map(activity => (
        <div onClick={() => {
            if ((availableBudget - activity.price * 200) >= 0){
              PushActivityToDataBase(activity)
            } else {
              console.log('NONONONONONONONONONONONONONONO')
             
            }
            }} key={activity.activity}>
          <h3> Name: {activity.activity}</h3>
          <p> Accessibility: {activity.accessibility}</p>
          <p> Type: {activity.type}</p>
          <p> Participants: {activity.participants} </p>
          <p> Price: {activity.price * 200} </p>
          <button>Add to interests</button>
        </div>
      ))}
    </div>
  )
}

export default ListActivities

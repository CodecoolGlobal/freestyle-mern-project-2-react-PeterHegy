import React, { useEffect, useState } from 'react';

function EditNeedToChange({ NeedToChange , OnTakeBack,  availableBudget,  budget }) {
    const actKeys = ['activity', 'accessibility', 'type', 'participants', 'price']
    const [oldCost, setOldCost] = useState(NeedToChange.price )
    const [updatedAct, setUpdatedAct] = useState({
        name: NeedToChange.activity,
        accessibility: NeedToChange.accessibility,
        type: NeedToChange.type,
        participants: NeedToChange.participants,
        price: NeedToChange.price ,
        key: NeedToChange.key 
    })


    function handleEvent(e) {
        setUpdatedAct({
            ...updatedAct,
            [e.target.name] : e.target.value
        })
    }

  
      async  function updateActivity (activity) {
         await   fetch('http://localhost:3000/edit', {
                method: 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(activity)
            })
        }
        
  



    return (
        <div>
            <p>Available budget: {availableBudget}</p>
            {actKeys.map(act => (
                <div key={act}>
                    <label>{act}: </label>
                    <input name={act} onChange={(e) => { handleEvent(e) }} defaultValue={NeedToChange[act]} id={act} />
                </div>
            ))}
            <button onClick={() => {updateActivity(updatedAct);
           if ((updatedAct.price * 200) > oldCost) { budget(availableBudget, updatedAct.price * 200, false); setOldCost(updatedAct.price * 200)} else {budget(availableBudget, updatedAct.price * 200, true) ; setOldCost(updatedAct.price * 200)} }}>Save</button>
            <button onClick={() => {OnTakeBack('Favourites')}}>Back</button>
        </div>
    );
}

export default EditNeedToChange;

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
        let value = e.target.value;
        if (e.target.name == 'price') {
            value /= 200;
        }
        setUpdatedAct({
            ...updatedAct,
            [e.target.name]: value
        })
    }
  
      async  function updateActivity (activity) {
         await   fetch('/api/edit', {
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
            {actKeys.map(act => {
                let defaultValue = NeedToChange[act];
                if (act === 'price') {
                    defaultValue *= 200;
                } 
                return <div key={act}>
                    <label>{act}: </label>
                    <input name={act} onChange={(e) => { handleEvent(e) }} defaultValue={defaultValue} id={act} />
                </div>
            })}
            <button onClick={() => {updateActivity(updatedAct);
           if ((updatedAct.price * 200) > oldCost) { budget(availableBudget, updatedAct.price * 200, false); setOldCost(updatedAct.price * 200)} else {budget(availableBudget, updatedAct.price * 200, true) ; setOldCost(updatedAct.price * 200)} }}>Save</button>
            <button onClick={() => {OnTakeBack('Favourites')}}>Back</button>
        </div>
    );
}

export default EditNeedToChange;

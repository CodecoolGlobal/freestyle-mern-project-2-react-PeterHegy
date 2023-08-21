import './App.css';
import React, { useState, useEffect } from 'react';
import BudgetPage from './components/BudgetPage';
import ListActivities from './components/ListActivities';
import ActivityType from './components/ActivityType'
import Favourites from './components/Favourites'
import FinalPage from './components/FinalPage';
import Update from './components/Update';

function App() {
  const [choosedType, setChoosedType] = useState('')
  const [page, setPage] = useState('budget')
  const [budget, setBudget] = useState(0);
  const [posOrNeg, setPosOrNeg] = useState(true)
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(99999);
  const [edit, setEdit] = useState({})


  function handleModifyBudget(e) {
    setBudget(e.target.value);
  }

  function handleModifyMin(e) {
    setMin(e.target.value);
  }

  function handleModifyMax(e) {
    setMax(e.target.value);
  }


  function handlePageChange(page) {
    setPage(page);
  }

  function handleChoosedType(type) {
    setChoosedType(type)
    setPage('List')
  }

  function handleBudget(sum, cost, operation) {
    if (operation) {
      setBudget(sum - cost)
    } else {
      setBudget(sum + cost)
    }
  }

  function handleFavouritePage() {
    setPage('Favourites')
  }

  function handleEditPage(page, activity) {
    setEdit(activity)
    setPage(page)
  }

  return (
    page === 'budget' ? (
      <div className="BudgetPage">
        <BudgetPage
          onShowMeClick={handlePageChange}
          onSubmitBudget={handleModifyBudget}
          onSubmitMin={handleModifyMin} //make them onChange
          onSubmitMax={handleModifyMax}
        />
      </div>
    ) : (
      page === 'Choosing' ? (
        <div>
          <ActivityType
            onClickType={handleChoosedType}
          />
        </div>
      ) : page === 'List' ? (
        <div>
          <ListActivities
            availableBudget={budget}
            choosedType={choosedType}
            minimum={min}
            maximum={max}
            budget={handleBudget}
            OnclickFavourite={handleFavouritePage}
            onShowMeClick={handlePageChange}
            OnclickBack={handlePageChange}
          />
        </div>
      ) : page === 'Favourites' ? (
        <Favourites 
        OnClickEdit={handleEditPage}
        onShowFinal={handlePageChange}
         OnclickBack={handlePageChange}
         availableBudget={budget}
         budget={handleBudget}
         />
      ) : page === 'Final' ? (
        <FinalPage
          availableBudget={budget}
          onTakeMeBack={handlePageChange}
        />
      ) : page === 'Edit' ? (
        < Update NeedToChange={edit} OnTakeBack={handlePageChange} availableBudget={budget}
        budget={handleBudget} />
      ) : <p>jo</p>)
  )
}


export default App;

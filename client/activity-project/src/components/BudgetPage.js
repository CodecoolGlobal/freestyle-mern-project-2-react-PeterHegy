import React from 'react';

function BudgetPage({ onShowMeClick, onSubmitBudget, onSubmitMin, onSubmitMax }) {


  return (
    <div className='inside-container'>
      <label>Set your budget</label>
      <input onChange={onSubmitBudget} type='number' />
      <br></br>

      <label>Minimum price</label>
      <input onChange={onSubmitMin} type='number' />
      <br></br>

      <label>Maximum price</label>
      <input onChange={onSubmitMax} type='number' />
      <br></br>

      <button onClick={() => { onShowMeClick('Choosing') }}>Show me some activities!</button>
    </div>
  )
}

export default BudgetPage;
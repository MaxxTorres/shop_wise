//import createDataContext from './createDataContext'
// Not working wiht createDataContext
// const postReducer = (progress, action) => {
//     return action.payload
// }
  
// const setProgress = (dispatch) => {
//     return () => {
//         console.log("Dispatching set_progress action with payload 50");
//         dispatch({type: 'set_progress', payload: 50})
//     }
//   }

// export const {Context, Provider} = createDataContext(
// postReducer,
// {
//     setProgress
// },
// []
// )

import React, { createContext, useState, useEffect } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({children}) => {
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(100);
  const [percent, setPercent] = useState((total / budget) * 100);

  const getTotal = (state) => {
    let totalPrice = 0
    let i = 0
    while (i < state.length) {
      if (state[i].purchased){
        totalPrice += state[i].price;
      }
      i++;
    }
    setTotal(totalPrice)
  }

  const getBudget = (value) => {
    setBudget(value)
  }

  const getPercent = () => {
    if (total > budget) {
      setPercent(100);
    } else {
      setPercent(Math.round((total / budget) * 100))
    }
    return percent
  }

  const status = {total, budget, percent};

  return (
    <BudgetContext.Provider value={{status, getTotal, getPercent, getBudget}}>
      {children}
    </BudgetContext.Provider>
  );
};


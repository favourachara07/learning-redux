import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

// you shouldnt have side effects like data fecthing, or using date object in reducer function(they shoudl be pure)
const accountSlice=createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state,action) {
       state.balance+=action.payload
       state.isLoading=false
    },
    withdraw(state,action){
      state.balance-=action.payload
    },
    // but we just simply returned from teh if block cos we r just modifying values in these new reducers so we will not return the state
    requestLoan: {
      prepare(amount,purpose){
        return {
          payload: {amount,purpose}
        }
      },
      reducer(state,action){
      if(state.loan>0) return;

      state.loan= action.payload.amount
      state.loanPurpose=action.payload.purpose
      state.balance+=action.payload.amount
    }},
    payLoan(state){
      state.balance-=state.loan
      state.loan=0
      state.loanPurpose=''
    },
    convertingCurrency(state){
      state.isLoading=true
    }
  }
})
// this automtically created action creators only receive one arguments to fix this we have to prepare the data before passing it to the action creator
export const {withdraw,requestLoan,payLoan}=accountSlice.actions

export function deposit(amount, currency) {
  if (currency==="USD") return { type: "account/deposit", payload: amount };
  // us retyurning a func here, redux will know that it is a thunk(the async action to execute)
  return async function(dispatch) {
      try {
          dispatch({type: 'account/convertingCurrency'})
          const response = await fetch(`https://api.frankfurter.app/latest?base=${currency}&symbols=USD`);
          const data = await response.json();
          const convertedAmount = (amount * data.rates.USD).toFixed(2);
          dispatch({ type: "account/deposit", payload: parseFloat(convertedAmount) });
      } catch (error) {
          console.error("Error converting currency:", error);
      }
  }
      // return
  } 

export default accountSlice.reducer
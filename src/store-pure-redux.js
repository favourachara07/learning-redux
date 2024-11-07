// redux in isolation(pure redux without react)
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// combining our reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
// telling redux/store that we want to use thunk middleware in our app
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
// store.dispatch(createCustomer("Favour Achara", "24343434"));
// store.dispatch(deposit(250));
// console.log(store.getState());

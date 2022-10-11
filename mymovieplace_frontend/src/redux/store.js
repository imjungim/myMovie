import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from './reducers'
import getReducer from './reducers/reducer'

let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
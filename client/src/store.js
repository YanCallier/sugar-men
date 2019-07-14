// # The store works for redux : it holds the whole state tree of the application.

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// # thunk : A kind of redux middleware
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

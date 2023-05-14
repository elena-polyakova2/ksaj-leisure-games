//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action);
  }
  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState())

  next(action);

  console.log('next state: ', store.getState());
};

//generate store
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
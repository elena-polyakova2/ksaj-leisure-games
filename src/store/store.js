//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from './root-reducer';

//generate store
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';        
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'] //values for reducer that don't need to be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 
- generate store; 
- render logger only if node environment is equal to development, filter anything that's not true;
- start usung thunk;
*/
const middleWares = [
  process.env.NODE_ENV === 'development' && logger, 
  thunk
].filter(
  Boolean
);

//to use ReactDevTools instead of compose from redux
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;                        

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
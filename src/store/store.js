//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';        
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], //values for reducer that need to be persisted
}

//saga
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 
- render logger only if node environment is equal to development, filter anything that's not true;
*/
const middleWares = [
  process.env.NODE_ENV === 'development' && logger, 
  sagaMiddleware
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
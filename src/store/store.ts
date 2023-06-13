//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';        
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

//initialize RootState
export type RootState = ReturnType<typeof rootReducer>;

//extend window object
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//assign what whitelist has to contain
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
}; 

const persistConfig: ExtendedPersistConfig = {
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
    (middleware): middleware is Middleware =>
  Boolean(middleware)
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
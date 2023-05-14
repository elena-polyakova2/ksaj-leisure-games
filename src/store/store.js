//This is the file for redux to generate the sore object to use in the application
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'] //values for reducer that don't need to be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//generate store
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
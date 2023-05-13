import { USER_ACTION_TYPES } from './user.types';

//create reducer
export const userReducer = (state=INITIAL_STATE, action) => {
  console.log('dispathed');
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
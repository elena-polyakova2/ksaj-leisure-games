import { AnyAction } from 'redux';
import { signInFailed, signOutFailed, signUpFailed, signInSuccess, signOutSuccess } from './user.action'; 
import { UserData } from '../../utils/firebase/firebase.utils';

//inital data
export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

//create reducer
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};


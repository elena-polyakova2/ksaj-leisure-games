import { AnyAction } from 'redux';
import { Category } from './categories.types';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';

//This file stores data to get from API
export type CategoriesState = {
  readonly categories: Category[]; //as values can't be modified
  readonly isLoading: boolean;
  readonly error: Error | null; //error or null
}

//what the reducer keeps track of
export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false, //track if data is in loading stage
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => { //respond to received actions

  if(fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true };
  }

  if(fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if(fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  //if actions above doesn't match
  return state;
};
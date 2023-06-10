import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';
import { CategoryAction } from './categories.action';

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
  action = {} as CategoryAction
) => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
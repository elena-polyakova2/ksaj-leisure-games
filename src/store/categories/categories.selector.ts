import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;

//create memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], //array of input selectors
  (categoriesSlice) => categoriesSlice.categories
);

//This document transforms the data taken from API into desired form
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => 
  categories.reduce((acc, category) => {
  const { title, items } = category;
  acc[title.toLowerCase()] = items;
  return acc;
  }, {} as CategoryMap)
);

//selector to get value isLoading
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);



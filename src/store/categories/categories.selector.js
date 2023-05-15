import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

//create memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], //array of input selectors
  (categoriesSlice) => categoriesSlice.categories
)

//This document transforms the data taken from API into desired form
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
  categories.reduce((acc, category) => {
  const { title, items } = category;
  acc[title.toLowerCase()] = items;
  return acc;
  }, {})
);

//selector to get value isLoading
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);



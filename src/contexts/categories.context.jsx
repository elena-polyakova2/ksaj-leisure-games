import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//export context
export const CategoriesContext = createContext({
  categoriesMap: {},
});

//export provider
export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('collections');
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    } 
    
    getCategoriesMap();
  }, []);

  const value = {categoriesMap};
  return(
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
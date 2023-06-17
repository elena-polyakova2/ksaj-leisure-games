import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector';
import { CategoryContainer, Title } from './category.styles';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  //take category from url parameter
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; //assume category is not optional value and will always be present
  //take categoriesMap from useSelector that transforms the categories array 
  const categoriesMap = useSelector(selectCategoriesMap);

  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  //set products' update when category's url or categoriesMap will change
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {/*if isLoading true, render the Spinner component; if it's not true, render the Category container */}
      { 
        isLoading ? (
          <Spinner />
         ) : (
          <CategoryContainer>
            {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CategoryContainer>
         )
      }   
    </Fragment>
  );
};

export default Category;
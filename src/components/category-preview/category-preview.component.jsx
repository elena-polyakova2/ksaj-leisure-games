import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
 return (
  <CategoryPreviewContainer>
    <h2>
      <Title to={title}>{title.toUpperCase()}</Title>
    </h2>
    <Preview>
      {
        //filter by product in tha array and index in the array, and get first 4 products
        products.filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </Preview>
  </CategoryPreviewContainer>
 );
};

export default CategoryPreview;
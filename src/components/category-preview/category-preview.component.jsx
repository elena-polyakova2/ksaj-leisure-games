import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
 return (
  <div className='category-preview-container'>
    <h2>
      <span className='title'>{title.toUpperCase()}</span>
    </h2>
    <div className='preview'>
      {
        //filter by productin tha array and index in the array, and get first 4 products
        products.filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  </div>
 );
};

export default CategoryPreview;
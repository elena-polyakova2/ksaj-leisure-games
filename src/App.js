
const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Trampoulines',
    },
    {
      id: 2,
      title: 'Table games',
    },
    {
      id: 3,
      title: 'Sport balls',
    },
    {
      id: 4,
      title: 'Outdoor sport & games',
    },
    {
      id: 5,
      title: 'Children sport & games',
    }
  ]

  return (
    <div className="categories-container">
      {categories.map(({title}) => (
        <div className="category-container">
          <div className='backgroun-image' />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop</p>
          </div>
          </div>
      ))};
    </div>
  );
};

export default App;

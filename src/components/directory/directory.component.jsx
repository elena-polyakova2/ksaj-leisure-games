import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';

const categories = [
  {
    id: 1,
    title: 'bicycles',
    imageUrl: 'https://i.ibb.co/VYRgq10/bicycles.jpg',
    route: 'shop/bicycles'
  },
  {
    id: 2,
    title: 'table games',
    imageUrl: 'https://i.ibb.co/MpLbw0j/table-games.jpg',
    route: 'shop/table%20games'
  },
  {
    id: 3,
    title: 'sport balls',
    imageUrl: 'https://i.ibb.co/9srhmBL/sport-balls.jpg',
    route: 'shop/sport%20balls'
  },
  {
    id: 4,
    title: 'outdoor sport & games',
    imageUrl: 'https://i.ibb.co/YNH96BL/outdoor-sport-and-games.jpg',
    route: 'shop/outdoor%20sport%20&%20games'
  },
  {
    id: 5,
    title: 'children\'s sport & games',
    imageUrl: 'https://i.ibb.co/fDFK68G/children-s-sport-and-games.jpg',
    route: 'shop/children\'s%20sport%20&%20games'
  }
]

const Directory = () => {
  return(
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))};
    </DirectoryContainer>
  );
};

export default Directory;
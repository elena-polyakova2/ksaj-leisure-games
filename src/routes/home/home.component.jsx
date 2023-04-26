import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';

const Home = () => {

  const categories = [
    {
      id: 1,
      title: 'bicycles',
      imageUrl: 'https://i.ibb.co/VYRgq10/bicycles.jpg'
    },
    {
      id: 2,
      title: 'table games',
      imageUrl: 'https://i.ibb.co/MpLbw0j/table-games.jpg'
    },
    {
      id: 3,
      title: 'sport balls',
      imageUrl: 'https://i.ibb.co/9srhmBL/sport-balls.jpg'
    },
    {
      id: 4,
      title: 'outdoor sport & games',
      imageUrl: 'https://i.ibb.co/YNH96BL/outdoor-sport-and-games.jpg'
    },
    {
      id: 5,
      title: 'children\'s sport & games',
      imageUrl: 'https://i.ibb.co/fDFK68G/children-s-sport-and-games.jpg'
    }
  ]

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
};

 export default Home;    

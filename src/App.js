import { useEffect, Suspense  } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/spinner/spinner.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { checkUserSession } from './store/user/user.action';
import { GlobalStyle } from './global.styles';

const App = () => {
   
  const dispatch = useDispatch();

    //get subscription call for auth from the Firebase
    useEffect(() => {
      dispatch(checkUserSession());
    }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

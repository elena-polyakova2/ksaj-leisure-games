import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as KSAJLogo } from '../../assets/ksaj-logo.svg'; 
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext, CartProvider } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {

  const { currentUser } = useContext(UserContext); //get actual value of current user
  const { isCartOpen } = useContext(CartContext);

  return(
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <KSAJLogo className='logo'/>
        </Link>
        
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
              : (<Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>)
          }  
          <CartIcon />      
        </div>
        {isCartOpen && <CardDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
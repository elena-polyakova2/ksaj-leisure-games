import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as KSAJLogo } from '../../assets/ksaj-logo.svg'; 
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  //get user reducer from redux
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <KSAJLogo className='logo'/>
        </LogoContainer>
        
        <NavLinks>
          {
            currentUser ? (
              <span>
                {currentUser.displayName}
              </span>)
              : (
              <span>
               GUEST
              </span>)
          }
          <NavLink to='/shop'>
            SHOP ALL
          </NavLink>       
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>)
              : (
              <NavLink to='/auth'>
               SIGN IN
              </NavLink>)
          }  
          <CartIcon />      
        </NavLinks>
        {isCartOpen && <CartDropdown />}       
      </NavigationContainer>
      <Outlet />    
    </Fragment>
  );
};

export default Navigation;
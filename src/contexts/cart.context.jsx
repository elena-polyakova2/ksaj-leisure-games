import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  //increment quantity if productToAdd exists in cartItems, otherwise, return it
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
    { ...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem
    );
  }
  //return new array with modified cartItems and/or new cart item
  return [ ...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  //check if the quantity is equal to 1, if it is, remove the item from the cart
  if (existingCartItem.quantity === 1) {
    //remove item if its id equals the id of cartItemToRemove
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  //return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
    );
};

//ig cart item is equal the cart item is alredy there, filter it out
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  //count cart items
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  //summarize the cart items
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
  
};
// src/context/CartProvider.jsx
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const MyCartProduct = createContext();

export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    
    if (existing) {
      setCartItems(prev => prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty }: item));
      toast.success(`Updated ${product.title?.substring(0, 20)}... quantity!`,{
        closeButton: true
      });
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: qty }]);
      toast.success(`${product.title?.substring(0, 20)}... added to cart! 🛒`,{
        closeButton: true
      });
    }
    
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.info(`Removed ${item?.title?.substring(0, 20)}... from cart`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared', {
      closeButton: true
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isItemAdded = (productId) => {
    return !!addedItems[productId];
  };

   const proceddToCheckOut = ()=>{
    toast.success('Order Placed! 🎉');
  }

  return (
    <MyCartProduct.Provider value={{
      quantity,
      setQuantity,
      increment,
      decrement,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isItemAdded,
      addedItems,
      proceddToCheckOut
    }}>
      {children}
    </MyCartProduct.Provider>
  );
};
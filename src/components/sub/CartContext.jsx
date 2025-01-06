import React, { createContext, useReducer } from 'react';

// 장바구니 관련 초기 상태
const initialState = {
  cartItems: [], // { id, name, price, quantity, ... }
};

// 장바구니 관련 리듀서 함수
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // 장바구니에 상품 추가 로직
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // 이미 존재하는 상품이면 수량 증가
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        // 새로운 상품 추가
        return { ...state, cartItems: [...state.cartItems, { ...action.payload }] };
      }

    case 'REMOVE_FROM_CART':
      // 장바구니에서 상품 제거 로직
      return {
        ...state,
        cartItems: state.cartItems.filter((_, index) => index !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      // 상품 수량 업데이트 로직
      const updatedCartItems = [...state.cartItems];
      updatedCartItems[action.payload.index].quantity = action.payload.newQuantity;
      return {
        ...state,
        cartItems: updatedCartItems,
      };

      case 'CLEAR_CART': // 장바구니 비우기 액션 타입 처리
      return {
        ...state,
        cartItems: [], // cartItems를 빈 배열로 초기화
      };
      
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // useReducer 훅 사용
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const getCartCount = () => {
    return cartState.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 장바구니에 상품 추가 함수
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // 장바구니에서 상품 제거 함수
  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  // 장바구니 상품 수량 업데이트 함수
  const updateCartItemQuantity = (index, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, newQuantity } });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart: cartState.cartItems, // 장바구니 상품 목록
      getCartCount,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
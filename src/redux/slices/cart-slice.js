import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
  totalItemsInCart: 0,
  subTotal: 0,
  deliveryFee: 0,
  totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemInCart >= 0) {
        state.cart[itemInCart].itemQuantity += 1;
        state.cart[itemInCart].price = state.cart[itemInCart].price * 2;
      } else {
        let item = { ...action.payload, itemQuantity: 1 };
        state.cart.push(item);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemId); //return every item that it ID doesn't match payload ID
    },
    decreaseItem: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload);
      if (itemInCart.itemQuantity === 1) {
        return;
      } else {
        itemInCart.itemQuantity = itemInCart.itemQuantity - 1;
        itemInCart.price = itemInCart.price / 2;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalItemsInCart= 0;
      state.subTotal= 0;
      state.deliveryFee= 0;
      state.totalAmount= 0;
    },
    calculateTotals: (state) => {
      // array with 0 value because of reduce method
      let amount = [0];
      let totalItems = 0;
      state.cart.forEach((item) => {
        const converterToNumber = Number(item.price);
        amount.push(converterToNumber);
        // multiply every price with quantity == total
        totalItems += item.itemQuantity;
      });

      //reduce function
      const reducer = (accumulator, curr) => accumulator + curr;
      const sum = amount.reduce(reducer);

      //add delivery fee
      const deliveryPercentage = 0.03;
      const deliveryFee =Math.round( sum * deliveryPercentage);
      const total = Math.round(sum + deliveryFee);

      state.deliveryFee = deliveryFee
      state.subTotal = sum;
      state.totalItemsInCart = totalItems;
      state.totalAmount = total
    },
  },
});

export const {
  addToCart,
  removeItem,
  calculateTotals,
  decreaseItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

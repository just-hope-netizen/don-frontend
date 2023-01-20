import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoading: true,
  query: null,
  products: {
    pizza: null,
    empanda: null,
    drink: null,
    dessert: null
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    productSearchedFor: (state, action) => {
      state.query = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = false
    },
    resetState: (state) => {
      state.isLoading = true
      state.query = null
    },
    setProduct: (state, action) => {
      //use category to set product
      const category = action.payload[0].categories[0];
      if (category === 'pizza') {
        state.products.pizza = action.payload
      } else if (category === 'empanda') {
        state.products.empanda = action.payload
      } else if (category === 'drink') {
        state.products.drink = action.payload
      } else {
        state.products.dessert = action.payload
      }
    }
  },
});

export const { productSearchedFor, resetState, setIsLoading, setProduct } = productSlice.actions;
export default productSlice.reducer;

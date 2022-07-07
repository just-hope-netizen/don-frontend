import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoading: true,
  query: null,
  
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
    }
  },
});

export const {  productSearchedFor, resetState, setIsLoading } = productSlice.actions;
export default productSlice.reducer;

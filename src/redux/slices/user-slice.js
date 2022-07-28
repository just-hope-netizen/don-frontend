import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  _id: null,
  username: null,
  email: null,
  password: null,
  address: null,
  isAdmin: false,
  config: {
    headers: {
      token: null,
    },
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      if (action.payload.accessToken) {
        state.config.headers.token = action.payload.accessToken;
      }
    },
    removeUser: (state) => {
      state._id = null;
      state.username = null;
      state.email = null;
      state.password = null;
      state.address = null;
      state.isAdmin = false;
      state.config.headers.token = null;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    getDetailsToLogin: (state, action) => {
      state.password = action.payload.password
      state.email = action.payload.email
    },
    removeDetailsAfterLogin: (state) => {
      state.email = null;
      state.password = null;
    }
  },
});
export const { getUser, removeUser, addAddress, getDetailsToLogin, removeDetailsAfterLogin } = userSlice.actions;
export default userSlice.reducer;

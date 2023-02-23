import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  token: null,
  isLoggedIn: false,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, { payload }) {
      state.userName = payload.name;
      state.token = payload.accessToken;
      state.isLoggedIn = true;
    },
    logIn: (state, { payload }) => {
      console.log(payload);
      state.userName = payload.name;
      state.token = payload.accessToken;
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.userName = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    refresh: (state, { payload }) => {
      state.userName = payload.name;
      state.isLoggedIn = true;
    },
  },
});
export const { register, logIn, logOut, refresh } = usersSlice.actions;
export default usersSlice.reducer;

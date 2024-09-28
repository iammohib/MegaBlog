import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

// Creating the auth slice using createSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload.userData);
    },
    logout: (state, action) => {
      (state.status = false), (state.userData = null);
    },
  },
});

// Exporting the login and logout actions from the auth slice
export const { login, logout } = authSlice.actions;

// Exporting the reducer to be used in the store configuration
export default authSlice.reducer;

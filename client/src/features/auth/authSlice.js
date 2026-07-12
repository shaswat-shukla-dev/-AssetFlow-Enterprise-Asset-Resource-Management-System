import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("assetflow_user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem("assetflow_token") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("assetflow_token", token);
      localStorage.setItem("assetflow_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("assetflow_token");
      localStorage.removeItem("assetflow_user");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

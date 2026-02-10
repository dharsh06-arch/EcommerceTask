import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isauth: !!localStorage.getItem("token"),
  role: localStorage.getItem("role"),
};

const authSlice = createSlice({
  name: "isauth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(state, "state data")
      state.isauth == true,
      (state.role = action.payload.role);

      localStorage.setItem("token", "12345678900987654321");
      localStorage.setItem("role", action.payload.role);

    },
    logout: (state) => {
      state.isauth == false,
            state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

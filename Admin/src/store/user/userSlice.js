import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => (state = action.payload),
  },
});

export const selectUserState = (state) => state.user;
export const userActions = userSlice.actions;
export default userSlice;

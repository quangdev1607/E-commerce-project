import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncActions";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    msg: "",
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      (state.isLoggedIn = false), (state.token = null), (state.current = null), (state.msg = "");
    },
    clearMessage: (state, action) => {
      state.msg = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.msg = "Session expired, please login again";
    });
  },
});

export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;

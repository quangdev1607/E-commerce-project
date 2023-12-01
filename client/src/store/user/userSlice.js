import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncActions";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      (state.isLoggedIn = false), (state.token = null);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });

    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

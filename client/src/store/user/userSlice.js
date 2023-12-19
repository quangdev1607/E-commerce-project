import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncActions";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    msg: "",
    currentCart: [],
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
    updateCart: (state, action) => {
      const { pid, quantity, color } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
      state.currentCart = updatingCart.map((el) => {
        if (el.color === color && el.product._id === pid) {
          return { ...el, quantity };
        } else return el;
      });
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
      state.currentCart = action.payload.cart;
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

export const { login, logout, clearMessage, updateCart } = userSlice.actions;
export default userSlice.reducer;

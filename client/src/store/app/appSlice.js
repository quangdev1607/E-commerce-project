import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const appSlice = createSlice({
  name: "app",

  initialState: {
    isLoading: false,
    categories: [],
    isShowModal: false,
    modalChildren: null,
    isShowCartModal: false,
  },

  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCartModal: (state) => {
      state.isShowCartModal = state.isShowCartModal === false ? true : false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    });

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { showModal, showCartModal } = appSlice.actions;

export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'

export const productSlice = createSlice({
    name: 'product',

    initialState: {
        isLoading: false,
        newProducts: []
    },

    reducers: {
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

export default productSlice.reducer



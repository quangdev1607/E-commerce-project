import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../api'

export const getCategories = createAsyncThunk(
    'app/getCategories',
    async (data, { rejectWithValue }) => {
        const response = await apis.apiGetCategories()

        // bị lỗi thì reject và trả về data
        if (!response.success) return rejectWithValue(response)

        // Không lỗi thì trả về data
        return response
    },

)
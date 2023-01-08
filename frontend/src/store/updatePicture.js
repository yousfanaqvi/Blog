import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPicture = createAsyncThunk('user/editPicture',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },}
    const response =await axios.post(
    '/editPicture',
    bodyFormData,
    config
    );
        return response.data;}
    catch (error) 
    {
        return rejectWithValue(error.message);
    }
})
    
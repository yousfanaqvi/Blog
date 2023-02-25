import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updatePost = createAsyncThunk('user/updatePost',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },}
    const response =await axios.post(
    '/updatePost',
    bodyFormData,
    config
    );
        return response.data;}
    catch (error) 
    {
        return rejectWithValue("Error");
    }
})
    
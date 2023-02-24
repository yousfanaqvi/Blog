import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editProfile = createAsyncThunk('user/editProfile',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },}
    const response =await axios.post(
    '/editProfile',
    bodyFormData,
    config
    );
        return response.data;}
    catch (error) 
    {
        return rejectWithValue("Error");
    }
})
    
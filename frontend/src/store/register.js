import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk('user/register',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    // withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },}
    const response =await axios.post(
    '/registerUser',
    bodyFormData,
    config
    );
        return response.data;}
    catch (error) 
    {
        return rejectWithValue("This username has been taken");
    }
})
    
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk('user/login',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },}
    const response =await axios.post(
    '/login',
    bodyFormData,
    config
    );
    localStorage.setItem('sessionId', response.sessionId)
    return response.data;}
    catch (error) 
    {
        return rejectWithValue("invalid user");
    }
})
    
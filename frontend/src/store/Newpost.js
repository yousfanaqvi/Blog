import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newPost = createAsyncThunk('user/newPost',async (bodyFormData, { rejectWithValue }) => {
    try {
    const config = {
    // withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },}
    const response =await axios.post(
    'https://blog-server-gilt.vercel.app/createPost',
    bodyFormData,
    config
    );
        return response.data;}
    catch (error) 
    {
        return rejectWithValue("Unable to post your Artilce");
    }
})
    
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const readAllPost = createAsyncThunk(
    'user/readAllPost',
    async (arg, { rejectWithValue }) => {
      try {
         const config = {
            withCredentials: true,
        }
        const { data } = await axios.get("/readAllPost",config)
        return data
      } catch (error) {
        if (error)
        {
            return rejectWithValue("rejected")
        }
        }
      
    }
  )
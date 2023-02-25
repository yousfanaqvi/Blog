import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { rejectWithValue }) => {
      try {
         const config = {
            // withCredentials: true,
        }
        const { data } = await axios.get('https://blog-server-gilt.vercel.app/getUserData',config)
        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )
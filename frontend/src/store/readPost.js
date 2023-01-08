import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const readPost = createAsyncThunk(
    'user/readPost',
    async (userid ,{ rejectWithValue }) => {
      try {
         const config = {
            withCredentials: true,
            params:{
              id:userid
            }
        }
        const { data } = await axios.get('/readPost',config)
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
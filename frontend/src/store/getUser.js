import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { rejectWithValue }) => {
      try {
        // get user data from store
         const config = {
            withCredentials: true,

        //   headers: {
        //     Authorization: `${user.sessionId}`,
        //   },
        }
        const { data } = await axios.get('/getUserData',config)
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
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./register";
import {loginUser} from "./login"
import { getUserDetails } from "./getUser";
import { editProfile } from "./updateUser";
import { editPicture } from "./updatePicture";
import { newPost } from "./Newpost";
import {updatePost} from "./editPost"
import { readPost } from "./readPost";
import { readAllPost } from "./readAllPosts";
const sessionId = localStorage.getItem('sessionId')
  ? localStorage.getItem('sessionId')
  : null


const userSlice= createSlice({
    name:"user",
    initialState:{
        loading: false,
        Response:null,
        loginResponse:null,
        logoutResponse:null,
        editpicResponse:null,
        error:null,
        userInfo:null,
        sessionId,
        posts:null,
        allposts:null
  
    },
    reducers:{
        reset(state){
          state.loading= false
          state.Response=null
          state.loginResponse=null
          state.editpicResponse=null
          state.error=null
          state.posts=null
          state.allposts=null
        },
        logout(state){
          localStorage.removeItem('sessionId') // deletes token from storage
          state.loading = false
          state.userInfo = null
          state.Response=null
          state.error=null
          state.loginResponse=null
          state.editpicResponse=null
          state.sessionId=null 
          state.posts=null
          state.allposts=null

        }
        
               
    },
    extraReducers: {
        //////////////////////////login/////////////////////////////////////////
        [loginUser.pending]: (state) => {
            state.loading = true
            state.loginResponse = null
            state.error=null
          },
          [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload.user
            state.sessionId = payload.sessionId
            state.error=null
          },
          [loginUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          },    
       ////////////////////////////////////register////////////////////////////////
        [registerUser.pending]: (state) => {
          state.loading = true
          state.Response = null
          state.error=null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.Response = payload // registration successful
          
        },
        [registerUser.rejected]: (state, { payload }) => {
          state.loading = false
          state.error=payload
        },
        /////////////////////////////////////////get user////////////////////////
          [getUserDetails.pending]: (state) => {
            state.loading = true
          },
          [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.error=null
          },
          [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload

          },
          
          /////////////////////////////////////update profile//////////////////////////////

          [editProfile.pending]: (state) => {
            state.loading = true
            state.Response = "Updating.."
          },
          [editProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload 
            state.error=null
            state.Response="update successful"

          },
          [editProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload

          },

          ///////////////////////////////////////////update picture////////////////////
          [editPicture.pending]: (state) => {
            state.loading = true
            state.editpicResponse = false
          },
          [editPicture.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload 
            state.error=null
            state.editpicResponse=true

          },
          [editPicture.rejected]: (state, { payload }) => {
            state.loading = false
            state.Response = payload
          },
      ///////////////////////////////////////////New post///////////////////////////
      [newPost.pending]: (state) => {
        state.loading = true
        state.Response = null
        state.error=null
      },
      [newPost.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.Response = payload // post successful
        
      },
      [newPost.rejected]: (state, { payload }) => {
        state.loading = false
        state.error=payload
      },

       ///////////////////////////////////////////ediy post///////////////////////////
       [updatePost.pending]: (state) => {
        state.loading = true
        state.Response = null
        state.error=null
      },
      [updatePost.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.Response = payload // post successful
        
      },
      [updatePost.rejected]: (state, { payload }) => {
        state.loading = false
        state.error=payload
      },
      /////////////////////////////read post///////////////////////////
      [readPost.pending]: (state) => {
        state.loading = true
      },
      [readPost.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.posts = payload
        state.error=null
      },
      [readPost.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      /////////////////////////////read all post///////////////////////////
      [readAllPost.pending]: (state) => {
        state.loading = true
      },
      [readAllPost.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.allposts = payload
        state.error=null
      },
      [readAllPost.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      
      
         
    }

})

export const userActions= userSlice.actions;
export default userSlice;
// export default userSlice.reducer;

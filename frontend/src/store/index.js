// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from 'redux'
// import { persistStore, persistReducer, } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import userSlice  from './userSlice'

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// let reducer = combineReducers({
//     user:userSlice.reducer,
//   })
// const persistedReducer = persistReducer(persistConfig,reducer)
//   let store = configureStore({reducer: persistedReducer, 
//     middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   })
//   let persistor = persistStore(store)
  
// export {store,persistor}



import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
const store= configureStore({
    reducer:{
        user:userSlice.reducer,
      
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
    
});
export default store;
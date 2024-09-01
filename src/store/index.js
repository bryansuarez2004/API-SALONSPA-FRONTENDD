import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import servicesSlice from "./slices/services.slice";

export default configureStore({
   reducer:{
    user:userSlice,
    services:servicesSlice
   }
})
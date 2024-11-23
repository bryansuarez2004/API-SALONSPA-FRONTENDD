import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import servicesSlice from "./slices/services.slice";
import treatmentsSlice from "./slices/treatments.slice";
import historialSlice from "./slices/historial.slice"
import modalSessionSlice from "./slices/modalSession.slice"

export default configureStore({
   reducer:{
    user:userSlice,
    services:servicesSlice,
    treatments:treatmentsSlice,
     historial:historialSlice,
     modalSession:modalSessionSlice
   }
})
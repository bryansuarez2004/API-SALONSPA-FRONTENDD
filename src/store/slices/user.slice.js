import { createSlice } from "@reduxjs/toolkit";
import { axiosSpa } from "../../utils/configAxios";
import { toast } from "sonner";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser:{},
    currentHistorialServices: [],
    currentHistorialTreatments: []
  },
  reducers: {
    setUser : (state,action)=>{
        state.currentUser = action.payload
    },
    setHistorialServices : (state,action) => {
      state.currentHistorialServices = action.payload
    },
    addRegisterServices : (state,action) =>{
      state.currentHistorialServices.push(action.payload)
    },
    removeRegisterServices : (state,action) =>{
     const idToRemove = action.payload
      state.currentHistorialServices = state.currentHistorialServices.filter((serviceRegister)=>{
         return serviceRegister.id !== idToRemove
      })
    },
    addRegisterTreatments : (state, action) => {
        state.currentHistorialTreatments.push(action.payload)
    },
    removeRegisterTreatments : (state,action) =>{
      const idToRemove = action.payload
      state.currentHistorialTreatments = state.currentHistorialTreatments.filter((treatmentRegister)=>{
        return treatmentRegister.id !== idToRemove
     })
    }, 
    setHistorialTreatments : (state,action) => {
      state.currentHistorialTreatments = action.payload
    },

  },
});

export const {setUser,setHistorialServices,setHistorialTreatments,addRegisterServices,removeRegisterServices,removeRegisterTreatments,addRegisterTreatments} = userSlice.actions;
export default userSlice.reducer;

export const createUserThunk = (user) => (dispatch) => {
  const toastId = toast.loading("Creando usuario");

  return axiosSpa
    .post("/users", user)
    .then(({ data }) => {
        dispatch(setUser(data))
      toast.success("Usuario creado", {
        id: toastId,
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      toast.error("Error al crear usuario", {
        id: toastId,
      });
      console.log(err);
      return Promise.reject(err);
    });
};


export const getCurrentUserThunk = (idUser) => (dispatch) =>{
  axiosSpa.get(`/users/${idUser}`)
  .then(({data})=> {
      dispatch(setUser(data))
      console.log(data);
      
  })
  .catch((err)=>{
       console.log(err)
       
   
  })

}

export const getHistorialServices = (idUser) => (dispatch) =>{
  axiosSpa.get(`/userServices/${idUser}`)
  .then(({data})=> {
    dispatch(setHistorialServices(data))
    console.log(data);
    
})
.catch((err)=>{
     console.log(err)
     
 
})


}

export const getHistorialTreatments = (idUser) => (dispatch) =>{
  axiosSpa.get(`/userTreatments/${idUser}`)
  .then(({data})=> {
    dispatch(setHistorialTreatments(data))
    console.log(data);
    
})
.catch((err)=>{
     console.log(err)
     
 
})


}
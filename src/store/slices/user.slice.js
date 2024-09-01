import { createSlice } from "@reduxjs/toolkit";
import { axiosSpa } from "../../utils/configAxios";
import { toast } from "sonner";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser:{}
  },
  reducers: {
    setUser : (state,action)=>{
        state.currentUser = action.payload
    },

  },
});

export const {setUser} = userSlice.actions;
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
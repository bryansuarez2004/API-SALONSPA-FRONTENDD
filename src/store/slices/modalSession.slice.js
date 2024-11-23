import { createSlice } from "@reduxjs/toolkit";
import { axiosSpa } from "../../utils/configAxios";

const modalSessionSlice = createSlice({
    name:"modalSession",
    initialState : {
      modalInfoTreatment:false,
      sessionsPending:[]
    },
    reducers:{
        setOpenModal: (state,action)=>{
             state.modalInfoTreatment = action.payload
        },
        setSessionsPending : (state,action ) => {
        state.sessionsPending = action.payload
    } ,
        removeSessionPending : (state,action) => {
           const idToDelete = action.payload
            const  newSessions =  state.sessionsPending.filter ((sesion)=>{
                   return   sesion.id !== idToDelete
           })
           state.sessionsPending = newSessions
        },
        addSessionPending : (state,action) => {
          const newSession = action.payload
          state.sessionsPending.push(newSession)
        }
  
  
  }
}) 


export const {setOpenModal,setSessionsPending,removeSessionPending,addSessionPending  } =modalSessionSlice.actions

export default modalSessionSlice.reducer;

export const getSessionsPendingThunk = () => (dispatch) => {
    axiosSpa
      .get("/sessions?complete=false")
      .then(({ data }) => {
        console.log(data);
  
         dispatch(setSessionsPending(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };











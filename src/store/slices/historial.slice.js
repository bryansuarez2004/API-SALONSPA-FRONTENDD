import { createSlice } from "@reduxjs/toolkit";

 const getInfoRegister = function   () {
     const date = new Date()
     const actualDate = date.toLocaleDateString() 

     const registers = localStorage.getItem(`register-${actualDate}`);
  
     // Si existe, devuelve el arreglo parseado
     if (registers) {
       return JSON.parse(registers);
     } else {
        return []
     }
   
     
 }


const historialSlice = createSlice({
    name:"historial",
    initialState : {
       todayRegister : getInfoRegister()
    },
    reducers:{
        setTodayRegister : (state, action) => {
           const registers = state.todayRegister
           registers.push(action.payload)

           const date = new Date()
           const actualDate = date.toLocaleDateString() 
           localStorage.setItem(`register-${actualDate}`, JSON.stringify(registers));
        },

        deleteTodayRegister : (state, action) => {
          const registers = state.todayRegister
          const idToDelete = action.payload
         const newRegisters = registers.filter((register)=>{
                    return register.id !== idToDelete
         }) 
         state.todayRegister = newRegisters

          const date = new Date()
           const actualDate = date.toLocaleDateString() 
           localStorage.setItem(`register-${actualDate}`, JSON.stringify(newRegisters));
        }
    }
}) 

export const {setTodayRegister,deleteTodayRegister} = historialSlice.actions

export default historialSlice.reducer;


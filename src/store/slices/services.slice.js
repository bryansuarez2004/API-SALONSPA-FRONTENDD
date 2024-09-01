import { createSlice } from "@reduxjs/toolkit";
import { axiosSpa } from "../../utils/configAxios";
import { toast } from "sonner";


function initialServices () {
   const services =  localStorage.getItem('services')
if (services) {
    return JSON.parse(services) 
 }else {
    return []
 }

} 

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services:initialServices(),
    serviceToUpdate:false
  },
  reducers: {
    setService : (state,action)=>{
        state.services = action.payload
    },
    addService : (state,action) => {
      let serviceslocal = localStorage.getItem('services')
      if(serviceslocal) {
        serviceslocal = JSON.parse(serviceslocal)
      }
      else {
        serviceslocal = []
      }
      serviceslocal.push(action.payload)
      localStorage.setItem('services',JSON.stringify(serviceslocal))
      state.services.push(action.payload)
    },
    removeService : (state,action) =>{
        const idServiceToDelete = action.payload
        let serviceslocal = localStorage.getItem('services')
      if(serviceslocal) {
        serviceslocal = JSON.parse(serviceslocal)
      }
      else {
        serviceslocal = []
      }

      serviceslocal = serviceslocal.filter((service)=>{
             return service.id !== idServiceToDelete
      })
      localStorage.setItem('services',JSON.stringify(serviceslocal))
      state.services = serviceslocal
    },
    updateService : (state,action) =>{
     const newService =  action.payload

     let serviceslocal = localStorage.getItem('services')
      if(serviceslocal) {
        serviceslocal = JSON.parse(serviceslocal)
      }
      else {
        serviceslocal = []
      }

      serviceslocal.forEach(service => {
        if (service.id === newService.id) {
          service.name = newService.name;
          service.initPrice = newService.initPrice
        }
      });
      localStorage.setItem('services',JSON.stringify(serviceslocal))
      state.services = serviceslocal


    },
    alterModeChange : (state,action) => {
       
          state.serviceToUpdate = action.payload
       

    }

  },
});

export const {setService,addService,removeService,updateService,alterModeChange} = servicesSlice.actions;
export default servicesSlice.reducer;


export const getServicesThunk = () => (dispatch) => {
    console.log('pidiendo');
      axiosSpa.get('/services')
      .then(({data})=>{
         console.log(data);
         localStorage.setItem('services', JSON.stringify(data))
         
          dispatch(setService(data))

      })
      .catch((err)=>{
          console.log(err);
          
      })
  };


  export const createServiceThunk = (service) => (dispatch) => {
    const toastId = toast.loading("Creando servicio");
  
    return axiosSpa
      .post("/services", service)
      .then(({ data }) => {
          dispatch(addService(data))
        toast.success("servicio creado", {
          id: toastId,
        });
        console.log(data);
        return data;
      })
      .catch((err) => {
        toast.error("Error al crear servicio", {
          id: toastId,
        });
        console.log(err);
        return Promise.reject(err);
      });
  };  

  export const deleteServiceThunk = (serviceId) => (dispatch) => {
    const toastId = toast.loading("Eliminando servicio");
  
    return axiosSpa
      .delete(`/services/${serviceId}`)
      .then(({ data }) => {
          dispatch(removeService(serviceId))
        toast.success("servicio eliminado", {
          id: toastId,
        });
        console.log(data);
        return data;
      })
      .catch((err) => {
        toast.error("Error al eliminar servicio", {
          id: toastId,
        });
        console.log(err);
        return Promise.reject(err);
      });
  };  

  export const updateServiceThunk = (newService) => (dispatch) => {
    const toastId = toast.loading("Actualizando servicio");
    console.log(newService);
    
    return axiosSpa
      .put(`/services/${newService.id}`,newService)
      .then(({ data }) => {
          dispatch(updateService(data))
        toast.success("servicio actualizado", {
          id: toastId,
        });
        console.log(data);
        return data;
      })
      .catch((err) => {
        toast.error("Error al actualizar servicio", {
          id: toastId,
        });
        console.log(err);
        return Promise.reject(err);
      });
  };  
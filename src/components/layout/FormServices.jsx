import { FloatingLabel } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { alterModeChange, createServiceThunk, updateServiceThunk } from "../../store/slices/services.slice";
import { toast } from "sonner";
import { IoCloseSharp } from "react-icons/io5";

const FormServices = () => {
  const formRegister = useRef(null);
  const dispatch = useDispatch()
  const serviceToUpdate = useSelector((store) => store.services.serviceToUpdate);
 


   useEffect(()=>{
    if(serviceToUpdate){

      
      formRegister.current[0].value  =  serviceToUpdate.name
      formRegister.current[1].value  =  serviceToUpdate.initPrice
     
      
      console.log(formRegister);
    }
   
   },[serviceToUpdate])
    
  const  handleCreateService =  (e) =>{
    e.preventDefault()
    const formData = new FormData(formRegister.current);
    const data = Object.fromEntries(formData.entries()); 
    
    if (data.servicio.trim() === "") return toast.error("Coloca un nombre al servicio");

    const service = {
        name: data.servicio,
        initPrice: Number(data.precio)
    }
    dispatch(createServiceThunk(service))
    .finally(()=>formRegister.current.reset())
    

  }

  const handleUpdateService = (e) => {
    e.preventDefault()
    const formData = new FormData(formRegister.current);
    const data = Object.fromEntries(formData.entries()); 
    if (data.servicio.trim() === "") return toast.error("Coloca un nombre al servicio");

    const service = {
      id:serviceToUpdate.id,
      name: data.servicio,
      initPrice: Number(data.precio)
  }
  
   
  dispatch(updateServiceThunk(service))
    .finally(()=>{
      dispatch(alterModeChange(false))
      formRegister.current.reset()})
  }
  
  const handleCancelUpdate = (e) => {
    e.preventDefault()
    dispatch(alterModeChange(false))
      formRegister.current.reset()

  }
  return (
    <>
    <form ref={formRegister}  className={` ${serviceToUpdate ? 'bg-yellow-300' : 'bg-green-300'}  p-2  rounded-lg w-full mb-3`}>
       <div className="pl-3 font-semibold">
       Agrega un nuevo Servicio :
       </div>
    <div className="flex gap-2 p-3 pb-1 items-center  ">

      <FloatingLabel
        name="servicio"
        autoComplete={"off"}
        variant="outlined"
        label="Nombre del servicio"
    
        
        />

      <FloatingLabel
        name="precio"
        autoComplete={"off"}
        variant="outlined"
        label="precio inicial"
        type="number"
        />
     {
    
    serviceToUpdate ? 
    <div className="flex gap-2">
      <button onClick={(e)=>handleUpdateService(e)} className=" bg-black hover:bg-yellow-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
    <FaPencil className="text-white" />
  </button>
  <button onClick={(e)=>handleCancelUpdate(e)} className=" bg-black hover:bg-red-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
  <IoCloseSharp className="text-white " />
</button>
    </div>
    :
       <button onClick={(e)=>handleCreateService(e)} className=" bg-black hover:bg-lime-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
       <FaPlus className="text-white " />
     </button>
     }
    </div>
        </form>
        </>
  );
};

export default FormServices;

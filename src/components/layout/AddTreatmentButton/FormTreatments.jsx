import { FloatingLabel } from 'flowbite-react';
import React, { useEffect, useRef } from 'react'
import { FaPencil, FaPlus } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { createServiceThunk } from '../../../store/slices/services.slice';
import { alterModeChange, createTreatmentThunk, updateTreatmentThunk } from '../../../store/slices/treatments.slice';

const FormTreatments = () => {
  const formRegister = useRef(null);
  const dispatch = useDispatch()
  const treatmentToUpdate = useSelector((store) => store.treatments.treatmentToUpdate);

 


   useEffect(()=>{
    if(treatmentToUpdate){

      
      formRegister.current[0].value  =  treatmentToUpdate.name
      formRegister.current[1].value  =  treatmentToUpdate.initPrice
     
      
      console.log(formRegister);
    }
   
   },[treatmentToUpdate])
    
   const  handleCreateTreatment =  (e) =>{
     e.preventDefault()
     const formData = new FormData(formRegister.current);
     const data = Object.fromEntries(formData.entries()); 
    
     if (data.tratamiento.trim() === "") return toast.error("Coloca un nombre al tratamiento");

     const treatment = {
         name: data.tratamiento,
         initPrice: Number(data.precio)
     }
     console.log(treatment);
     
    dispatch(createTreatmentThunk(treatment))
     .finally(()=>formRegister.current.reset())
    

   }

   const handleUpdateTreatment = (e) => {
     e.preventDefault()
     const formData = new FormData(formRegister.current);
     const data = Object.fromEntries(formData.entries()); 
     if (data.tratamiento.trim() === "") return toast.error("Coloca un nombre al tratamiento");

     const treatment = {
       id:treatmentToUpdate.id,
       name: data.tratamiento,
    initPrice: Number(data.precio)
   }
  
   
   dispatch(updateTreatmentThunk(treatment))
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
    <form ref={formRegister}  className={` ${treatmentToUpdate ? 'bg-yellow-300' : 'bg-green-300'}  p-2  rounded-lg w-full mb-3`}>
       <div className="pl-3 font-semibold">
       Agrega un nuevo Tratamiento :
       </div>
    <div className="flex gap-2 p-3 pb-1 items-center  ">

      <FloatingLabel
        name="tratamiento"
        autoComplete={"off"}
        variant="outlined"
        label="Nombre del tratamiento"
    
        
        />

      <FloatingLabel
        name="precio"
        autoComplete={"off"}
        variant="outlined"
        label="precio inicial"
        type="number"
        />
     {
    
    treatmentToUpdate ? 
    <div className="flex gap-2">
      <button onClick={(e)=>handleUpdateTreatment(e)}  className=" bg-black hover:bg-yellow-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
    <FaPencil className="text-white" />
  </button>
  <button onClick={(e)=>handleCancelUpdate(e)}  className=" bg-black hover:bg-red-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
  <IoCloseSharp className="text-white " />
</button>
    </div>
    :
       <button onClick={(e)=>handleCreateTreatment(e)} className=" bg-black hover:bg-lime-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg">
       <FaPlus className="text-white " />
     </button>
     }
    </div>
        </form>
        </>
  );
}

export default FormTreatments
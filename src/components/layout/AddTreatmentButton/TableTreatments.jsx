import React, { useEffect } from 'react'
import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { alterModeChange, deleteTreatmentThunk } from '../../../store/slices/treatments.slice';

const TableTreatments = () => {


    const treatments = useSelector((store) => store.treatments.treatments);
    const dispatch = useDispatch()


   

    const handleUpdateTreatment = (serviceToUpdate) => {
        console.log(serviceToUpdate);
        dispatch(alterModeChange(serviceToUpdate))
        
      }

    const handleDeleteTreatment = (treatmentId) => {
        dispatch(deleteTreatmentThunk(treatmentId))
    }   


  return (
    <div className="p-2   bg-white w-full rounded-lg ">
             
            <div className="grid grid-cols-[1fr,1fr,20%] bg-black rounded-t-xl   overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">Tratamientos</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">Precio inicial</div>
              <div className=" text-center   "></div>
            </div>

            <div className="max-h-[200px] custom-scroll overflow-y-auto">

              {
                treatments.map((treatment)=>{
                  return <div key={treatment.id} className="grid grid-cols-[1fr,1fr,20%] items-center hover:bg-slate-300   bg-slate-200">
                  <div className=" text-center font-medium  py-3 ">{treatment.name}</div>
                  <div className=" text-center  py-3">{`${treatment.initPrice} soles`}</div>
                  <div className="flex justify-center gap-2">
                  <div onClick={()=>handleUpdateTreatment(treatment)} className=" text-center  py-3"><div className=" bg-black hover:bg-yellow-500 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaPencil className="text-white" /></div></div>
                  <div onClick={()=>handleDeleteTreatment(treatment.id)} className=" text-center  py-3"><div className=" bg-black hover:bg-cancel transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaTrashCan className="text-white" /></div></div>
                  </div>
                    
                </div>
                })
              }
              
                
              </div>


          </div>
  )
}

export default TableTreatments   
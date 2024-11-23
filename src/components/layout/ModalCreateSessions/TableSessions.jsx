import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaCheck, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { axiosSpa } from '../../../utils/configAxios';
import { MdTimer } from 'react-icons/md';
import { FaCheckSquare } from 'react-icons/fa';
import { toast } from 'sonner';
import { removeSessionPending } from '../../../store/slices/modalSession.slice';

const TableSessions = ({setSessionToUpdate,registerTreatment,setRegisterTreatment,sessionToUpdate}) => {
     const dispatch = useDispatch()
    

    

    const handleUpdateSession = (sesion) => {
        setSessionToUpdate(sesion)
        
      }

    const handleDeleteSession = (idSession) => {
  const toastId = toast.loading("Eliminando sesion");
        
       axiosSpa.delete(`/sessions/${idSession}`)
       .then(({data})=> {
        toast.success("sesion eliminada", {
            id: toastId,
          });
         const newSessions = registerTreatment.sessions.filter((sesion)=>{
            return sesion.id !== idSession
         })
         setRegisterTreatment({...registerTreatment,sessions:newSessions})
         dispatch(removeSessionPending(idSession))

        console.log(data)}
       ).catch((err)=>{
        toast.error("error al eliminar sesion", {
            id: toastId,
          });
        console.log(err)}
       )
    }   
   
    const handleCheckSession = (sesionToCheck) => {
        const toastId = toast.loading("realizando sesion");
        
       axiosSpa.put(`/sessions/${sesionToCheck.id}`,{...sesionToCheck,complete:true})
       .then(({data})=> {
        toast.success("sesion realizada", {
            id: toastId,
          });
         const newSessions = registerTreatment.sessions.map((sesion)=>{
            if(sesion.id === sesionToCheck.id ) {
                return data
            } else {
                return sesion
            }
         })
         
         setRegisterTreatment({...registerTreatment,sessions:newSessions})

        console.log(data)}
       ).catch((err)=>{
        toast.error("error al realizar sesion", {
            id: toastId,
          });
        console.log(err)}
       )

    }

  return (
    <div className="p-2   bg-white w-full rounded-lg ">
             
            <div className="grid grid-cols-[1fr,1fr,30%] bg-black rounded-t-xl   overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">Fecha</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">Hora</div>
              <div className=" text-center "> icono</div>
            </div>

            <div className="max-h-[200px] custom-scroll overflow-y-auto">

              {
                registerTreatment.sessions?.map((sesion)=>{
                  return <div key={sesion.id} className={`${sessionToUpdate.id === sesion.id ? 'bg-purple-400' : 'bg-slate-200'}   grid grid-cols-[1fr,1fr,30%] items-center hover:bg-slate-300   `}>
                  <div className=" text-center font-medium  py-3 ">{sesion.date}</div>
                  <div className=" text-center  py-3">{`${sesion.hour} `}</div>
                  <div className="flex justify-center gap-2">

                    {
                        sesion.complete ?
                        <div className='text-green-800 px-1 rounded-full border-2 border-green-800'>
                            completado
                        </div>:
                        <>
                        <div title='hecho' onClick={()=>handleCheckSession(sesion)} className=" text-center  py-3"><div className=" bg-black hover:bg-green-500 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaCheck   className="text-white" /></div></div>
                  <div title='postergar' onClick={()=>handleUpdateSession(sesion)} className=" text-center  py-3"><div className=" bg-black hover:bg-purple-700 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><MdTimer  className="text-white" /></div></div>
                  <div title='cancelar sesion' onClick={()=>handleDeleteSession(sesion.id)} className=" text-center  py-3"><div className=" bg-black hover:bg-cancel transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaTrashCan className="text-white" /></div></div>
                        </>
                    }
                  
                  </div>
                    
                </div>
                })
              }
              
                
              </div>


          </div>
  )
}

export default TableSessions
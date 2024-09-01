import React from 'react'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { alterModeChange, deleteServiceThunk } from '../../store/slices/services.slice';

const TableServices = () => {
    const services = useSelector((store) => store.services.services);
    const dispatch = useDispatch()

    
  const  handleDeleteService =  (id) =>{

     dispatch(deleteServiceThunk(id))
    
    

  }

  const handleUpdateService = (serviceToUpdate) => {
    console.log(serviceToUpdate);
    dispatch(alterModeChange(serviceToUpdate))
    
  }


  return (
    <div className="p-2   bg-white w-full rounded-lg ">
             
            <div className="grid grid-cols-[1fr,1fr,20%] bg-black rounded-t-xl   overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">Servicios</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">Precio inicial</div>
              <div className=" text-center   "></div>
            </div>

            <div className="max-h-[200px] custom-scroll overflow-y-auto">

              {
                services.map((service)=>{
                  return <div key={service.id} className="grid grid-cols-[1fr,1fr,20%] items-center hover:bg-slate-300   bg-slate-200">
                  <div className=" text-center font-medium  py-3 ">{service.name}</div>
                  <div className=" text-center  py-3">{`${service.initPrice} soles`}</div>
                  <div className="flex justify-center gap-2">
                  <div onClick={()=>handleUpdateService(service)} className=" text-center  py-3"><div className=" bg-black hover:bg-yellow-500 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaPencil className="text-white" /></div></div>
                  <div onClick={()=>handleDeleteService(service.id)} className=" text-center  py-3"><div className=" bg-black hover:bg-cancel transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaTrashCan className="text-white" /></div></div>
                  </div>
                    
                </div>
                })
              }
              
                
              </div>


          </div>
  )
}

export default TableServices
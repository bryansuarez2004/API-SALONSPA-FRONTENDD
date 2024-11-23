import React from 'react'
import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeRegisterServices } from '../../../store/slices/user.slice';
import { axiosSpa } from '../../../utils/configAxios';
import { toast } from 'sonner';
import { deleteTodayRegister } from '../../../store/slices/historial.slice';

const HistorialServices = () => {
    const historialServices = useSelector((store) => store.user.currentHistorialServices);
    const dispatch = useDispatch()

    const deleteRegisterService = (idToDelete) => {
        const toastId = toast.loading("eliminando");

        axiosSpa.delete(`/userServices/${idToDelete}`).then(()=>{
            toast.success("se elimino correctamente", {
                id: toastId,
              });
            dispatch(removeRegisterServices(idToDelete))
            dispatch(deleteTodayRegister(idToDelete))
        }).catch((err)=>{
            toast.error("hubo un problema al eliminar", {
                id: toastId,
              });
              console.log(err);
              
        })
    }




    
  return (
    <div className=' w-full  h-full overflow-hidden'>
        <div className="grid grid-cols-[1fr,0.8fr,1.7fr,15%] bg-black rounded-t-xl   overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">servicio</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">precio</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">fecha</div>
              <div className=" text-center   "></div> 
            </div>

            <div className="max-h-[200px] custom-scroll overflow-y-auto">

              {
                historialServices.map((service)=>{
                  return <div key={service.id} className="grid  py-[6px]   grid-cols-[1fr,0.8fr,1.7fr,15%] items-center hover:bg-slate-300   bg-slate-200">
                  <div className=" text-center font-medium   ">{service.nameService}</div>
                  <div className=" text-center  ">{`${service.price} `}</div>
                  <div className=" text-center  ">{service.date}</div>
                  <div className="flex  justify-center gap-1">
                  <div onClick={()=>deleteRegisterService(service.id)}  className=" text-center  "><div className=" bg-black hover:bg-cancel transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaTrashCan className="text-white  text-xs" /></div></div>
                  </div>
                    
                </div>
                })
              }
              </div>
    </div>
  )
}

export default HistorialServices
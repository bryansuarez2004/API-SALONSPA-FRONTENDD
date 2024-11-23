import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { axiosSpa } from '../../../utils/configAxios';
import { FaTrashCan } from 'react-icons/fa6';
import { removeRegisterTreatments } from '../../../store/slices/user.slice';
import { setOpenModal } from '../../../store/slices/modalSession.slice';
import { deleteTodayRegister } from '../../../store/slices/historial.slice';

const HistorialTreatments = () => {
    const historialTreatments = useSelector((store) => store.user.currentHistorialTreatments);
    const dispatch = useDispatch()

    const deleteRegisterTreatment = (idToDelete) => {
        const toastId = toast.loading("eliminando");

        axiosSpa.delete(`/userTreatments/remove/${idToDelete}`).then(()=>{
            toast.success("se elimino correctamente", {
                id: toastId,
              });
              dispatch(deleteTodayRegister(idToDelete))
            dispatch(removeRegisterTreatments(idToDelete))
        }).catch((err)=>{
            toast.error("hubo un problema al eliminar", {
                id: toastId,
              });
              console.log(err);
              
        })
    }




    
  return (
    <div className=' w-full  h-full overflow-hidden'>
        <div className="grid grid-cols-[1fr,1fr,2fr,20%] bg-black rounded-t-xl   overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">tratamiento</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">precio</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">fecha</div>
              <div className=" text-center   "></div> 
            </div>

            <div className="max-h-[200px] custom-scroll overflow-y-auto">

              {
                historialTreatments.map((treatment)=>{
                  return <div onClick={()=>dispatch(setOpenModal(treatment.id))} key={treatment.id} className="grid py-[6px]  grid-cols-[1fr,0.8fr,1.7fr,15%] items-center hover:bg-slate-300   bg-slate-200">
                  <div className=" text-center font-medium  ">{treatment.nameTreatment}</div>
                  <div className=" text-center ">{`${treatment.price} `}</div>
                  <div className=" text-center ">{treatment.date}</div>
                  <div className="flex  justify-center gap-1">
                  <div onClick={()=>deleteRegisterTreatment(treatment.id)}  className=" text-center  "><div className=" bg-black hover:bg-cancel transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"><FaTrashCan className="text-white  text-xs" /></div></div>
                  </div>
                    
                </div>
                })
              }
              </div>
    </div>
  )
}

export default HistorialTreatments
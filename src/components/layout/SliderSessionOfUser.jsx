import useEmblaCarousel from 'embla-carousel-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../../store/slices/modalSession.slice';

const SliderSessionOfUser = () => { 
    const dispatch = useDispatch()
    const [emblaRef] = useEmblaCarousel()
    const sessions = useSelector((store) => store.modalSession.sessionsPending);
   const user =  useSelector((store)=>store.user.currentUser)
    
     const sessionsPerUser = sessions.filter((sesion)=>{
                return sesion.user_treatment?.idUser === user.id
     })
 
  return (
    <div className="embla h-full" ref={emblaRef}>
      <div className="embla__container h-full">
        {
            sessionsPerUser.map((sesion)=>{
                return <div key={sesion.id} onClick={()=>dispatch(setOpenModal(sesion.userTreatmentId))} className="embla__slide bg-purple-500 p-2 rounded-md  ">
                    <div className='uppercase text-xl font-medium'>
                        {sesion.user_treatment?.nameTreatment}
                    </div>
                    <div>
                        dia:  {sesion.date}
                    </div>
                    <div>
                        hora:  {sesion.hour}
                    </div>
                    <div>
                        usuario: {sesion.user_treatment?.nameUser}
                    </div>
                 </div>
            })
        }
      </div>
    </div>
  )
}

export default SliderSessionOfUser
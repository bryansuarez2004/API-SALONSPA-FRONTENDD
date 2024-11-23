import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal } from '../../store/slices/modalSession.slice'

const SliderSessionsPending = () => {
    const dispatch = useDispatch()
    const [emblaRef] = useEmblaCarousel()
    const sessions = useSelector((store) => store.modalSession.sessionsPending);

 console.log(sessions);
 
  return (
    <div className="embla h-full" ref={emblaRef}>
      <div className="embla__container h-full">
        {
            sessions.map((sesion)=>{
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

export default SliderSessionsPending
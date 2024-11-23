import { FloatingLabel } from 'flowbite-react';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { axiosSpa } from '../../../utils/configAxios';
import { addRegisterTreatments } from '../../../store/slices/user.slice';
import { setOpenModal } from '../../../store/slices/modalSession.slice';
import { setTodayRegister } from '../../../store/slices/historial.slice';

const FormRegisterTreatments = ({treatmentSelected,setModalOn}) => {
    const user = useSelector((store) => store.user.currentUser);
    const form = useRef(null);
    const dispatch = useDispatch()
    console.log(form);
  
    useEffect(() => {
        treatmentSelected.name
        ? (form.current[2].value = treatmentSelected.initPrice)
        : (form.current[2].value = "-");
    }, [treatmentSelected]);
  
    const onSubmit = (e) => {
      e.preventDefault();
      
  
       if (treatmentSelected.name && form.current[2].value) {
         const dataTreatments = {
           price: form.current[2].value,
           userId: user.id,
           treatmentId: treatmentSelected.id,
         }
  
         const toastId = toast.loading("Creando registro");

         axiosSpa.post('/userTreatments',dataTreatments)
         .then(({data})=>{
           toast.success("Registro creado", {
             id: toastId,
           });
           dispatch(addRegisterTreatments(data))
           dispatch(setOpenModal(data.id))
           dispatch(setTodayRegister(data))
           setModalOn(false)
           
          console.log(data)
       }).catch((err)=>{
           toast.error("intente denuevo porfavor", {
             id: toastId,
           });
      console.log(err)
       }) 

        
  
       } else {
         toast.error("Completa todos los datos");
       } 
    };
  
    return (
      <>
        <form ref={form} className="flex flex-col gap-2">
          <FloatingLabel
            variant="outlined"
            label="usuario"
            value={user.fullName}
            readOnly
            name="user"
          />
  
          <FloatingLabel
            variant="outlined"
            label="tratamiento"
            value={treatmentSelected.name ? treatmentSelected.name : "-"}
            readOnly
            name="service"
          />
          <FloatingLabel name="price" variant="outlined" label="precio" />
          <button onClick={(e) => onSubmit(e)} className="bg-red-200">
            enviar
          </button>
        </form>
      </>
    );
}

export default FormRegisterTreatments
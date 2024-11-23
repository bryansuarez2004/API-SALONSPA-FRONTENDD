import { Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import FormCreateSessions from './ModalCreateSessions/FormCreateSessions'
import TableSessions from './ModalCreateSessions/TableSessions'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal } from '../../store/slices/modalSession.slice'
import { axiosSpa } from '../../utils/configAxios'

const ModalCreateSessions = () => {
    const dispatch = useDispatch()
    const treatmentId = useSelector((store) => store.modalSession.modalInfoTreatment);
    const [sessionToUpdate, setSessionToUpdate] = useState(false)
    const [registerTreatment, setRegisterTreatment] = useState(false)

    useEffect(()=>{
        if(treatmentId){
             console.log('CALCULANDO EN MODO ON EL MODAL DE SESIONES');
             
            axiosSpa.get(`/userTreatments/one/${treatmentId}`)
            .then(({data})=> {
                   console.log(registerTreatment);
                   
                setRegisterTreatment(data)})
            .catch((err)=> console.log(err)
        ) 
    }
    },[treatmentId])


  return (
    <Modal
        dismissible
        show={treatmentId}
        size="xl"
        position={"center"}
        onClose={() => {
            dispatch(setOpenModal(false))
        }}
      >
        <Modal.Body className="bg-black rounded-md grid place-items-center ">
          <div className="p-4 pb-6 text-3xl text-gray-200 font-medium">
            Sesiones de {registerTreatment.nameTreatment} para el cliente {registerTreatment.nameUser}
          </div>
          <div className="bg-red-200 w-full ">
            <FormCreateSessions setRegisterTreatment={setRegisterTreatment} registerTreatment={registerTreatment}  setSessionToUpdate={setSessionToUpdate} sessionToUpdate={sessionToUpdate}  />
            <TableSessions sessionToUpdate={sessionToUpdate} setRegisterTreatment={setRegisterTreatment} registerTreatment={registerTreatment}   setSessionToUpdate={setSessionToUpdate}/>
            </div>
        </Modal.Body>
      </Modal>
  )
}

export default ModalCreateSessions
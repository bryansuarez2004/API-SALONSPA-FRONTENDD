import { Modal } from 'flowbite-react';
import React, { useState } from 'react'
import FormRegisterTreatments from '../layout/registerTreatments/FormRegisterTreatments';
import OptionsTreatments from '../layout/registerTreatments/OptionsTreatments';

const CreateRegisterTreatmentsButton = () => {
    const [modalOn, setModalOn] = useState(false);
    const [treatmentSelected, setTreatmentSelected] = useState({});
  
    return (
      <>
        <button
          onClick={() => setModalOn(true)}
          className="w-full p-3 font-medium "
        >
          Registrar Tratamiento
        </button>
  
        <Modal
          dismissible
          show={modalOn}
          size="xl"
          position={"center"}
          onClose={() => {
            setModalOn(false);
            setTreatmentSelected({});
          }}
        >
          <Modal.Body className="bg-black rounded-md grid place-items-center ">
            <div className="p-4 pb-6 text-4xl text-gray-200 font-medium">
              Registrar tratamiento realizado
            </div>
            <div className="bg-red-200 w-full grid grid-cols-[1fr,3fr]">
  
             <OptionsTreatments
              treatmentSelected={treatmentSelected}
              setTreatmentSelected={setTreatmentSelected}
              /> 
            <FormRegisterTreatments setModalOn={setModalOn} treatmentSelected={treatmentSelected}  />
              </div> 
          </Modal.Body>
        </Modal>
      </>
    );
}

export default CreateRegisterTreatmentsButton
import { Modal } from 'flowbite-react';
import React, { useState } from 'react'
import FormTreatments from '../layout/AddTreatmentButton/FormTreatments';
import TableTreatments from '../layout/AddTreatmentButton/TableTreatments';

const AddTreatmentButton = () => {
    const [openModal, setOpenModal] = useState(false);


    return (
      <>
        <button
          onClick={() => setOpenModal(true)}
          className="w-full p-3 font-medium "
        >
          Tratamientos
        </button>
  
        <Modal
          dismissible
          show={openModal}
          size="xl"
          position={"center"}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Body className="bg-black rounded-md grid place-items-center ">
            <div className="p-4 pb-6 text-4xl text-gray-200 font-medium">
             Tratamientos Disponibles
            </div>
  
            <FormTreatments />
            <TableTreatments />
  
  
            
          </Modal.Body>
        </Modal>
      </>
    );
}

export default AddTreatmentButton
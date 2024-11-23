import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import FormRegisterServices from "../layout/registerServices/FormRegisterServices";
import OptionsServices from "../layout/registerServices/OptionsServices";

const CreateRegisterServicesButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState({});

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="w-full p-3 font-medium "
      >
        Registrar Servicio
      </button>

      <Modal
        dismissible
        show={openModal}
        size="xl"
        position={"center"}
        onClose={() => {
          setOpenModal(false);
          setServiceSelected({});
        }}
      >
        <Modal.Body className="bg-black rounded-md grid place-items-center ">
          <div className="p-4 pb-6 text-4xl text-gray-200 font-medium">
            Registrar servicio realizado
          </div>
          <div className="bg-red-200 w-full grid grid-cols-[1fr,3fr]">

          <OptionsServices
            serviceSelected={serviceSelected}
            setServiceSelected={setServiceSelected}
            />
          <FormRegisterServices serviceSelected={serviceSelected} />
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateRegisterServicesButton;

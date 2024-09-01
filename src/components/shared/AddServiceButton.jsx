import React, { useReducer, useState } from "react";
import { Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import TableServices from "../layout/TableServices";
import FormServices from "../layout/FormServices";

const AddServiceButton = () => {
  const [openModal, setOpenModal] = useState(false);


  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="w-full p-3 font-medium "
      >
        Servicios
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
           Servicios Disponibles
          </div>

          <FormServices />

          <TableServices />

          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddServiceButton;

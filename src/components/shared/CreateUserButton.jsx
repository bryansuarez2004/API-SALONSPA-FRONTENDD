import React, { useRef } from "react";
import { FloatingLabel, Modal,Datepicker } from "flowbite-react";
import { useState } from "react";
import {putFullName} from "../../utils/formats"
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../store/slices/user.slice";
import { useNavigate } from 'react-router-dom';

const CreateUserButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const formRegister = useRef(null);
  const buttonSubmit = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister.current);
    const data = Object.fromEntries(formData.entries());
    buttonSubmit.current.disabled = true;
     console.log(data.fecha);
     
    const birthday = data.fecha
    const fullName = putFullName(data.nombre,data.apellido)

    const dataUser = {
        fullName,
        birthday,
        phone:data.phone
    }
     try{

       const hola = await dispatch(createUserThunk(dataUser))
       navigate(`users/${hola.id}`)

     }catch (error){
         console.log(error);
         
     } finally{

       buttonSubmit.current.disabled = false;
     }
    

      
      
    



  };




  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="w-full p-3 font-medium "
      >
        crear usuario
      </button>

      <Modal
        dismissible
        show={openModal}
        size="xl"
        position={'top-center'}
        onClose={() => setOpenModal(false)}
        initialFocus={false}
      >
        <Modal.Body className="bg-different rounded-md grid place-items-center ">
          <div className="p-4 pb-6 text-4xl text-gray-200 font-medium">
            Registra un Cliente
          </div>
          <form
            ref={formRegister}
            onSubmit={onSubmit}
            className="grid grid-cols-2 grid-rows-3 gap-2 "
          >
            <div  className="col-start-1 col-end-3  ">

            <FloatingLabel
                variant="outlined"
                autoComplete={"off"}
                name="fecha"
                type="date"
                label="Fecha de Nacimiento"
                className="  "
                />
                </div>
             
            <div>
              <FloatingLabel
                variant="outlined"
                autoComplete={"off"}
                name="nombre"
                label="nombre"
                className=" row-start-2 row-end-3 col-start-1 col-end-2  "
              />
            </div>
            <FloatingLabel
              name="apellido"
              autoComplete={"off"}
              variant="outlined"
              label="apellido"
              className=" row-start-2 col-start-2 col-end-3  "
            />
            <div className="row-start-3 col-start-1 col-end-3  ">
              <FloatingLabel
                autoComplete={"off"}
                name="phone"
                variant="outlined"
                label="Numero de telefono"
              />
            </div>
            <div className="col-start-1 col-end-3 ">
           
            </div>
          </form>
          <button
          ref={buttonSubmit}
            onClick={onSubmit}
            className=" px-4 mx-auto py-2 rounded-lg bg-salient transition-all duration-300 disabled:bg-red-600 disabled:cursor-not-allowed"
          >
            Crear Usuario
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateUserButton;

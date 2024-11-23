import { FloatingLabel } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { axiosSpa } from "../../../utils/configAxios";
import { addRegisterServices } from "../../../store/slices/user.slice";
import { setTodayRegister } from "../../../store/slices/historial.slice";

const FormRegisterServices = ({ serviceSelected }) => {
  const user = useSelector((store) => store.user.currentUser);
  const form = useRef(null);
  const dispatch = useDispatch()
  console.log(form);

  useEffect(() => {
    serviceSelected.name
      ? (form.current[2].value = serviceSelected.initPrice)
      : (form.current[2].value = "-");
  }, [serviceSelected]);

  const onSubmit = (e) => {
    e.preventDefault();
    

    if (serviceSelected.name && form.current[2].value) {
      const dataServices = {
        price: form.current[2].value,
        userId: user.id,
        serviceId: serviceSelected.id,
      }

      const toastId = toast.loading("Creando registro");
      axiosSpa.post('/userServices',dataServices)
      .then(({data})=>{
        toast.success("Registro creado", {
          id: toastId,
        });
        dispatch(addRegisterServices(data))
        dispatch(setTodayRegister(data))
       console.log(data)
    })
      .catch((err)=>{
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
          label="servicio"
          value={serviceSelected.name ? serviceSelected.name : "-"}
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
};

export default FormRegisterServices;

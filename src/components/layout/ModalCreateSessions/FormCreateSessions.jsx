import { FloatingLabel } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { axiosSpa } from "../../../utils/configAxios";
import { MdTimer } from "react-icons/md";
import { addSessionPending } from "../../../store/slices/modalSession.slice";

const FormCreateSessions = ({
  sessionToUpdate,
  setSessionToUpdate,
  registerTreatment,
  setRegisterTreatment,
}) => {
  const formRegister = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionToUpdate) {
      formRegister.current[0].value = sessionToUpdate.date;
      formRegister.current[1].value = sessionToUpdate.hour;

      console.log(formRegister);
    }
  }, [sessionToUpdate]);

  const handleCreateSession = (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister.current);
    const data = Object.fromEntries(formData.entries());

    if (data.date.trim() === "" || data.hour.trim() === "")
      return toast.error("debe haber fecha y hora para crear una sesion");

    const session = {
      userTreatmentId: registerTreatment.id,
      sessions: [
        {
          ...data,
          complete: false,
        },
      ],
    };
     console.log(registerTreatment);
     
    const toastId = toast.loading("Creando sesion");
    axiosSpa
      .post("/sessions", session)
      .then(({ data }) => {
        toast.success("sesion agendada", {
          id: toastId,
        });
         
        const newSessions = registerTreatment.sessions;
        newSessions.push(data[0]);
        setRegisterTreatment({ ...registerTreatment, sessions: newSessions });
        dispatch(addSessionPending(data[0]))
      })
      .catch((err) => {
        toast.error("Error al agendar sesion", {
          id: toastId,
        });
        console.log(err);
        return Promise.reject(err);
      })
      .finally(() => formRegister.current.reset());
  };

  const handleUpdateSession = (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister.current);
    const data = Object.fromEntries(formData.entries());
    if (data.date.trim() === "" || data.hour.trim() === "")
      return toast.error("debe haber fecha y hora para crear una sesion");

    const newSession = {
          ...data,
          complete: false,
       
    };

    
    const toastId = toast.loading("Actualizando sesion");
    axiosSpa
    .put(`/sessions/${sessionToUpdate.id}`, newSession)
    .then(({ data }) => {
      toast.success("sesion actualizada", {
        id: toastId,
      });
       
      const lastSessions = registerTreatment.sessions;
      const newSessions = lastSessions.map((sesion)=>{
           if(sesion.id === sessionToUpdate.id ) {
             return data
           } else {
            return sesion
           }
      });
      
      setRegisterTreatment({ ...registerTreatment, sessions: newSessions });
    })
    .catch((err) => {
      toast.error("Error al agendar sesion", {
        id: toastId,
      });
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      setSessionToUpdate(false)
      formRegister.current.reset()});
    
  };

  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setSessionToUpdate(false);
    formRegister.current.reset();
  };
  return (
    <>
      <form
        ref={formRegister}
        className={` ${
          sessionToUpdate ? "bg-purple-600" : "bg-green-300"
        }  p-2  rounded-lg w-full mb-3`}
      >
        <div className="pl-3 font-semibold">Agrega sesiones al tratamiento</div>
        <div className="flex gap-2 p-3 pb-1 items-center  ">
          <div className="grow">
            <FloatingLabel
              name="date"
              autoComplete={"off"}
              variant="outlined"
              label="fecha del tratamiento"
              type="date"
              className="w-full"
            />
          </div>
          <div className="grow">
            <FloatingLabel
              name="hour"
              autoComplete={"off"}
              variant="outlined"
              label="hora"
              type="time"
              className="w-full"
            />
          </div>
          {sessionToUpdate ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => handleUpdateSession(e)}
                className=" bg-black hover:bg-purple-700 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"
              >
                <MdTimer  className="text-white" />
              </button>
              <button
                onClick={(e) => handleCancelUpdate(e)}
                className=" bg-black hover:bg-red-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"
              >
                <IoCloseSharp className="text-white " />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => handleCreateSession(e)}
              className=" bg-black hover:bg-lime-600 transition-all duration-200 cursor-pointer w-min p-2 rounded-lg"
            >
              <FaPlus className="text-white " />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default FormCreateSessions;

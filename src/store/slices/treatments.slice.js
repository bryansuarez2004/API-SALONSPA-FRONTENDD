import { createSlice } from "@reduxjs/toolkit";
import { axiosSpa } from "../../utils/configAxios";
import { toast } from "sonner";

const treatmentsSlice = createSlice({
  name: "treatments",
  initialState: {
    treatments: [],
    treatmentToUpdate: false,
  },
  reducers: {
    setTreatment: (state, action) => {
      state.treatments = action.payload;
    },
    addTreatment: (state, action) => {
      state.treatments.push(action.payload);
    },
    alterModeChange: (state, action) => {
      state.treatmentToUpdate = action.payload;
    },
    updateTreatment: (state, action) => {
      const newTreatment = action.payload;

      const newTreatments = state.treatments;

      newTreatments.forEach((treatment) => {
        if (treatment.id === newTreatment.id) {
          treatment.name = newTreatment.name;
          treatment.initPrice = newTreatment.initPrice;
        }
      });
      state.treatments = newTreatments;
    },
    removeTreatment : (state,action) =>{
      const idTreatmentToDelete = action.payload
      let newTreatments = state.treatments

      newTreatments = newTreatments.filter((treatment)=>{
           return treatment.id !== idTreatmentToDelete
    })
    state.treatments = newTreatments
  }
  },
});

export const { setTreatment, addTreatment, alterModeChange, updateTreatment,removeTreatment } =
  treatmentsSlice.actions;
export default treatmentsSlice.reducer;

export const getTreatmentsThunk = () => (dispatch) => {
  console.log("pidiendo");
  axiosSpa
    .get("/treatments")
    .then(({ data }) => {
      console.log(data);

      dispatch(setTreatment(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createTreatmentThunk = (treatment) => (dispatch) => {
  const toastId = toast.loading("Creando tratamiento");

  return axiosSpa
    .post("/treatments", treatment)
    .then(({ data }) => {
      dispatch(addTreatment(data));
      toast.success("tratamiento creado", {
        id: toastId,
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      toast.error("Error al crear tratamiento", {
        id: toastId,
      });
      console.log(err);
      return Promise.reject(err);
    });
};

export const updateTreatmentThunk = (newTreatment) => (dispatch) => {
  const toastId = toast.loading("Actualizando tratamiento");

  return axiosSpa
    .put(`/treatments/${newTreatment.id}`, newTreatment)
    .then(({ data }) => {
      dispatch(updateTreatment(data));
      toast.success("tratamiento actualizado", {
        id: toastId,
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      toast.error("Error al actualizar tratamiento", {
        id: toastId,
      });
      console.log(err);
      return Promise.reject(err);
    });
};

export const deleteTreatmentThunk = (treatmentId) => (dispatch) => {
  const toastId = toast.loading("Eliminando tratamiento");

  return axiosSpa
    .delete(`/treatments/${treatmentId}`)
    .then(({ data }) => {
      dispatch(removeTreatment(treatmentId));
      toast.success("tratamiento eliminado", {
        id: toastId,
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      toast.error("Error al eliminar tratamiento", {
        id: toastId,
      });
      console.log(err);
      return Promise.reject(err);
    });
};

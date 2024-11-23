import React from 'react'
import { useSelector } from 'react-redux';

const OptionsTreatments = ({setTreatmentSelected,treatmentSelected}) => {
    const treatments = useSelector((store) => store.treatments.treatments);

    const handleSelectTreatment = (treatment) =>{
        setTreatmentSelected(treatment)
    }
  return (
    <div className='text-white auto-rows-min custom-scroll  grid max-h-[260px] overflow-y-auto  bg-black  gap-2
    '>
      {  treatments.map((treatment)=>{
        return <div key={treatment.id} onClick={() =>handleSelectTreatment(treatment)} className={`${treatmentSelected.id === treatment.id ? 'bg-yellow-300' : 'bg-slate-900'} cursor-pointer p-1 rounded-md h-min text-center mx-auto w-[100%]`}>
           {treatment.name}
        </div>
      })}
    </div>
  )
}

export default OptionsTreatments
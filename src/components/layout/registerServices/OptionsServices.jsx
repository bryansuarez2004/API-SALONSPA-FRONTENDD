import React from 'react'
import { useSelector } from 'react-redux';

const OptionsServices = ({setServiceSelected,serviceSelected}) => {
    const services = useSelector((store) => store.services.services);

    const handleSelectService = (service) =>{
        setServiceSelected(service)
    }
  return (
    <div className='text-white auto-rows-min custom-scroll  grid max-h-[260px] overflow-y-auto  bg-black  gap-2
    '>
      {  services.map((service)=>{
        return <div key={service.id} onClick={() =>handleSelectService(service)} className={`${serviceSelected.id === service.id ? 'bg-yellow-300' : 'bg-slate-900'} cursor-pointer p-1 rounded-md h-min text-center mx-auto w-[100%]`}>
           {service.name}
        </div>
      })}
    </div>
  )
}

export default OptionsServices
import React from 'react'
import { useSelector } from 'react-redux';

const OptionsServices = ({setServiceSelected,serviceSelected}) => {
    const services = useSelector((store) => store.services.services);

    const handleSelectService = (service) =>{
        setServiceSelected(service)
    }
  return (
    <div className='text-white p-5 flex flex-wrap gap-3
    '>
      {  services.map((service)=>{
        return <div key={service.id} onClick={() =>handleSelectService(service)} className={`${serviceSelected.id === service.id ? 'bg-yellow-300' : 'bg-slate-300'} cursor-pointer p-1 rounded-md`}>
           {service.name}
        </div>
      })}
    </div>
  )
}

export default OptionsServices
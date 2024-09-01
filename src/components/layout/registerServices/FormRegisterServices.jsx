import { FloatingLabel } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

const FormRegisterServices = ({serviceSelected}) => {
    const user =  useSelector((store)=>store.user.currentUser)
    console.log();
    

  return (
   <>
   <div className='flex gap-2'>

     
   <FloatingLabel
        variant="outlined"
        label="usuario"
      value={user.fullName}
      disabled
        />

<FloatingLabel
        variant="outlined"
        label="servicio"
      value={serviceSelected.name}
      disabled
        />
        <FloatingLabel
        variant="outlined"
        label="precio"
        />
   </div>
   <button className='bg-red-200'>enviar</button>
   </>
)
}

export default FormRegisterServices
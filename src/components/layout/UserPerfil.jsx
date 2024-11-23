import React from 'react'
import { capitalizeName } from '../../utils/formats'

const UserPerfil = ({currentUser}) => {
  return (
    <div className=' h-full w-full p-4'>
  
      <h1 className='text-4xl font-bold mb-2 '>{currentUser.fullName}</h1>
  
    
    <p><span className=' block font-bold  text-salient'>
      Telefono: 
      </span>  {currentUser.phone}</p>
    <p><span className=' block font-bold  text-salient'>
      Fecha de nacimiento: 
      </span> {currentUser.birthday}</p>
    </div>
  )
}

export default UserPerfil
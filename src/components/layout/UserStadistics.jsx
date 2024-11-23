import React, { useState } from 'react'
import AddServiceButton from '../shared/AddServiceButton'
import CreateRegisterServicesButton from '../shared/CreateRegisterServicesButton'
import HistorialServices from './UserStadistics/HistorialServices'
import CreateRegisterTreatmentsButton from '../shared/CreateRegisterTreatmentsButton'
import HistorialTreatments from './UserStadistics/HistorialTreatments'

const UserStadistics = () => {
  return (
    <div className=' h-full w-full p-4 flex flex-col gap-2'>

        <div className=' flex gap-4 justify-around'>
          <CreateRegisterServicesButton />
          <CreateRegisterTreatmentsButton  />
        </div>
        <div className='bg-salient grid grid-cols-2  grow'>
            <HistorialServices />
            <HistorialTreatments  />
        </div>
        

    </div> 
  )
}

export default UserStadistics
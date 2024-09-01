import React from 'react'
import AddServiceButton from '../shared/AddServiceButton'
import CreateRegisterServicesButton from '../shared/CreateRegisterServicesButton'

const UserStadistics = () => {
  return (
    <div className=' h-full w-full p-4 flex flex-col gap-2'>

        <div className=' flex gap-4 justify-around'>
          <CreateRegisterServicesButton />
        </div>
        <div className='bg-salient h-auto grow'>

        </div>

    </div> 
  )
}

export default UserStadistics
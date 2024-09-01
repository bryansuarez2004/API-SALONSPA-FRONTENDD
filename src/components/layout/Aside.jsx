import { Button } from 'flowbite-react';
import React from 'react'
import { MdClose, MdFormatLineSpacing } from 'react-icons/md'
import CreateUserButton from '../shared/CreateUserButton';
import AddServiceButton from '../shared/AddServiceButton';

const Aside = ({closeAside}) => {




  return (
    <>
    
    <div className='w-[80vw]  md:w-full pt-5 md:p-0 relative' >
     <MdClose onClick={closeAside} className='absolute md:hidden top-2 right-2 text-2xl' />
     
      <CreateUserButton />
      <AddServiceButton />
      <Button color="primary">Click me</Button>
    </div>
    
    </>
  )
}

export default Aside
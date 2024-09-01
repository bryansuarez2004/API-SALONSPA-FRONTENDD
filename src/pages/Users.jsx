import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Searcher from '../components/shared/Searcher'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserThunk } from '../store/slices/user.slice'
import UserPerfil from '../components/layout/UserPerfil'
import UserStadistics from '../components/layout/UserStadistics'

const Users = () => {
    const {id} = useParams()
   const user =  useSelector((store)=>store.user.currentUser)
   const dispatch = useDispatch()


   useEffect(()=>{
    
       dispatch(getCurrentUserThunk(id))
        console.log('pidiendo uusuario');
        
             //hacer la peticion
      
    
     
   },[id])
   

  return (
    <div className="w-full min-h-screen p-4 grid gap-4 md:grid-cols-[1fr,1.5fr] md:grid-rows-[1fr,3fr,1fr]">
            <div className="bg-bgbackward flex  items-center justify-center border-2 border-white/50  relative  rounded-xl  md:col-start-1 md:col-end-3 ">
              <Searcher />
           </div>
           <div className='bg-bgbackward  backdrop-blur-md border-2 border-white/50 rounded-xl '>
                  <UserPerfil currentUser={user} />
           </div>
           <div className='bg-bgbackward  backdrop-blur-md border-2 border-white/50 rounded-xl'>
                 <UserStadistics />
           </div>
           <div className='bg-bgbackward  backdrop-blur-md border-2 border-white/50 rounded-xl md:col-start-1 md:col-end-3'>
            citas
           </div>
      </div>
  )
}

export default Users
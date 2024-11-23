import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Searcher from '../components/shared/Searcher'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserThunk, getHistorialServices, getHistorialTreatments } from '../store/slices/user.slice'
import UserPerfil from '../components/layout/UserPerfil'
import UserStadistics from '../components/layout/UserStadistics'
import SliderSessionOfUser from '../components/layout/SliderSessionOfUser'
import { IoReturnDownBackOutline } from 'react-icons/io5'

const Users = () => {
    const {id} = useParams()
   const user =  useSelector((store)=>store.user.currentUser)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   //cada vez que haya un nuevo idUser
   useEffect(()=>{
    
       dispatch(getCurrentUserThunk(id))
       dispatch(getHistorialServices(id))
       dispatch(getHistorialTreatments(id))
        console.log('pidiendo uusuario');
        
             //hacer la peticion
      
    
     
   },[id])
    
   const handleChangePage = () =>{
     navigate('/')
   }

  return (
    <div className="h-screen  grid gap-4 md:grid-cols-[1fr,2fr] md:grid-rows-[1fr,3fr,1fr]">
            <div onClick={handleChangePage} className='absolute p-2 cursor-pointer border-2 flex justify-center items-center gap-2 text-sm rounded-lg right-0 mt-2 mr-2 bg-black z-[300] text-white'>REGRESAR <IoReturnDownBackOutline className='text-xl' /></div>
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
            <SliderSessionOfUser />
           </div>
      </div>
  )
}

export default Users
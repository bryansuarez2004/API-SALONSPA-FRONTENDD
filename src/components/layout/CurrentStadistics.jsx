import React from 'react'
import { useSelector } from 'react-redux'

const CurrentStadistics = () => {
   const todayRegisters =  useSelector((store) => store.historial.todayRegister)
   const totalPrice =  todayRegisters.reduce((total, register) => {
    return total + register.price;
  }, 0)
 
  return (
    <div className=' w-full  h-full overflow-hidden bg-white/50 grid grid-rows-[auto,1fr,auto]'>
    <div className="grid grid-cols-[1fr,2fr,1fr] bg-black rounded-t-xl   overflow-hidden">
          <div className=" text-center  font-semibold text-white p-2 ">trabajo</div>
          <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">cliente</div>
          <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">monto</div>
        </div>

        <div className=" custom-scroll overflow-y-auto">
          {
            todayRegisters.map(( register)=>{
              return   <div key={register.id} className="grid grid-cols-[1fr,2fr,1fr] bg-black  overflow-hidden">
              <div className=" text-center  font-semibold text-white p-2 ">{register.nameService || register.nameTreatment}</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">{register.nameUser}</div>
              <div className=" text-center  text-white  font-semibold border-x-2 border-black p-2 ">{register.price}</div>
            </div>
            })
          }



       
          </div>
          <div className=" bg-black text-white font-semibold p-2 text-right pr-6">
          total S/. {totalPrice}
          </div>
</div>
  )
}

export default CurrentStadistics
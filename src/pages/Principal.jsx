import React, { useRef } from "react";
import Searcher from "../components/shared/Searcher";
import Aside from "../components/layout/Aside";
import { MdFormatLineSpacing } from "react-icons/md";
import CurrentStadistics from "../components/layout/CurrentStadistics";

const Principal = () => {

    const aside = useRef(null);

  const openAside = () => {
    aside.current.classList.add("animate-openSlide");
    aside.current.classList.remove("animate-closeSlide");
  };

  const closeAside = () => {
    aside.current.classList.remove("animate-openSlide");
    aside.current.classList.add("animate-closeSlide");
  };
  return (
    <>
      <div className="w-full relative h-screen grid p-4 gap-4 grid-cols-[1fr] md:grid-cols-[1fr,1fr,1fr,1fr] grid-rows-[12%,1fr,1fr,1fr,1fr]">
      <MdFormatLineSpacing className="fixed z-10 right-3 top-3 text-2xl md:hidden"  onClick={openAside}/>
           <div className=" bg-bgfordward  flex items-center justify-center  border-2 border-white/50  relative  rounded-xl  md:col-span-4 md:row-span-1">
              <Searcher />
              
              
           </div>
           <div className="bg-bgfordward backdrop-blur-md   md:col-span-4 md:row-span-1">
             {/* slider de sesiones */}
           </div>
           <div className=" w-full md:col-span-3 row-span-3">
             <CurrentStadistics />
           </div>
           <div ref={aside} className=" md:row-span-3 rounded-xl translate-x-[130%] z-50 md:translate-x-0 right-3 top-3  fixed md:static bg-bgfordward backdrop-blur-md border-2 border-white/50"> 
              <Aside closeAside={closeAside} />
              
           </div>
      </div>
    </>
  );
};



export default Principal;

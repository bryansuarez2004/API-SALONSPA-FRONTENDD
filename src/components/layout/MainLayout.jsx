import React, { useRef } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  

  return (
      <div style={{backgroundImage:'url(/bg-glasmorph.avif)',backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'}}  className="  min-h-screen w-screen  flex flex-col items-center">
        
        <Outlet />
       
      </div>

      
  );
};

export default MainLayout;

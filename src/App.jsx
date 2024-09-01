import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Principal from "./pages/Principal";
import MainLayout from "./components/layout/MainLayout";
import { Flowbite } from "flowbite-react";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getServicesThunk } from "./store/slices/services.slice";

function App() {
  const dispatch = useDispatch()
  const customTheme = {
    floatingLabel: {
      input: {
        default: {
          outlined: {
            md: "peer block w-full appearance-none rounded-lg border border-black bg-white px-2.5 pb-2.5 pt-4 text-sm text-black focus:border-black focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500",
          },
        },
      },
      label: {
        default: {
          outlined: {
            md: "absolute rounded left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-textColor transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textColor dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500",
          },
        },
      },
    },
    modal: {
      root: {
        positions: {
          "top-center": "items-start justify-center pt-12",
        },
      },
      body: {
        base: "flex-1  p-6",
        popup: "pt-0",
      },
    },
    
  };

  useEffect(()=>{
    const services = localStorage.getItem('services') 
     if(!services) {
      dispatch(getServicesThunk())
      
     }
     
  },[])


  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Principal />} />

            <Route path="/users/:id" element={<Users />} />
          </Route>
        </Routes>
      </Flowbite>
      <Toaster position="top-right"   />
    </>
  );
}

export default App;

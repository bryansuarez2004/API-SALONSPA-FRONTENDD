import React, { useCallback, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { axiosSpa } from "../../utils/configAxios";
import { debounce } from "../../utils/debounce";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const Searcher = () => {
  const [optionsOfUsers, setOptionsOfUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null)
  const navigate  = useNavigate()

  const searchOptions = (query) => {
    if (query.trim() === "") {
      setOptionsOfUsers([]);
      setError(false);
      console.log("no hay nada");

      return;
    }

    setIsLoading(true);
    setError(false);
    query = query.toLowerCase()

    axiosSpa
      .get(`/users/search?name=${query}`)
      .then(({ data }) => {
        setOptionsOfUsers(data);
        console.log(data);
      })
      .catch((err) => {
        setError(true);
        console.log("hubo error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleNavigate = (idUser) =>{
        navigate(`/users/${idUser}`)
        inputRef.current.value = ''
        setOptionsOfUsers([])
  }

  const debouncedSearchOptions = useCallback(debounce(searchOptions, 300), []);

  return (
    <>
      <div className="relative md:min-w-[350px]   ">
        <IoSearch className="text-salient  text-xl top-[25%] left-2 absolute pointer-events-none" />
        <input
          onChange={(e) => {
            debouncedSearchOptions(e.target.value);
          }}
          ref={inputRef}
          type="text"
          className="px-5   transition-all bg-white duration-200  focus:ring-2  focus:ring-salient focus:border-none active:border-none  pl-9 w-full py-2 rounded-lg shadow-md shadow-shadow text-black"
          placeholder="Buscar por nombre completo... "
        />

        {(optionsOfUsers.length || error) && (
          <div className="absolute max-h-[200px] overflow-y-auto z-10 p-2 right-0 w-full bg-white backdrop-blur-md grid place-items-center  mt-2 rounded-lg ">
            {isLoading && <Spinner size="lg" className="fill-salient" />}
            {!error ? (
              optionsOfUsers.map((user) => {
                return (
                  <div 
                  onClick={()=>handleNavigate(user.id)}
                    key={user.id}
                    className="p-2 w-full cursor-pointer hover:bg-stone-200 rounded-md text-sm"
                  >
                    {user.fullName}
                  </div>
                );
              })
            ) : (
              <div className="p-2 w-full  rounded-md text-sm">
                {" "}
                no se encontraron resultados{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Searcher;

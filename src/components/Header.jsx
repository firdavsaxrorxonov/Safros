import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faClipboard, faGear, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import safrosLogo from '../assets/logo.svg';


function Header() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = safrosLogo;
    img.onload = () => setLogoLoaded(true);
  }, []);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      inputRef.current?.blur();
    }
  }, [showSearch]);

  return (
    <>
      <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b border-gray-300 pr-4 flex items-center justify-between z-50'>
        <div>
          {logoLoaded ? (
            <img className='w-28' src={safrosLogo} alt="logo" />
          ) : (
            <div className='w-28 h-10 bg-gray-200 animate-pulse rounded'></div>
          )}
        </div>

        <div className="relative flex items-center flex-row-reverse gap-2">
          <div className="w-6 h-6 relative cursor-pointer" onClick={() => setShowSearch(prev => !prev)}>
            <FontAwesomeIcon
              icon={faSearch}
              className={`absolute top-0 left-0 transition-all duration-300 text-xl
                ${showSearch ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={`absolute top-0 left-0 transition-all duration-300 text-xl
                ${showSearch ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`}
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Qidirish..."
            className={`transition-all duration-300 ease-in-out bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 rounded-md px-2 py-1.5
              ${showSearch ? 'opacity-100 w-48 scale-100' : 'opacity-0 w-0 scale-95 pointer-events-none'}`}
          />
        </div>
      </div>
      <div className='border-t border-gray-400 py-3 rounded-tl-2xl rounded-tr-2xl px-5 fixed bottom-0 w-full bg-white'>
        <nav>
          <ul className='flex items-center font-semibold justify-between'>
            <NavLink
              to="/qarzlar"
              className={({ isActive }) =>
                `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-black'}`
              }
            >
              Qarzlar
              <FontAwesomeIcon className='text-lg' icon={faDollar} />
            </NavLink>
            <NavLink
              to="/eslatmalar"
              className={({ isActive }) =>
                `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-black'}`
              }
            >
              Eslatmalar
              <FontAwesomeIcon className='text-lg' icon={faClipboard} />
            </NavLink>
            <NavLink
              to="/sozlamalar"
              className={({ isActive }) =>
                `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-black'}`
              }
            >
              Sozlamalar
              <FontAwesomeIcon className='text-lg' icon={faGear} />
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header

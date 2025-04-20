import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faClipboard, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import safrosLogo from '../assets/logo.svg'
function Header() {
  return (
    <>
      <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b-1 border-gray-300 pr-4 flex items-center justify-between'>
        <div>
          <img className='w-28' src={safrosLogo} alt="" />
        </div>

        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>


      </div>


      <div className='border-t-1 border-gray-400 py-3 rounded-tl-2xl rounded-tr-2xl px-5 fixed bottom-0 w-full bg-white'>
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

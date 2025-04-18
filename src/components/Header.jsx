import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faClipboard, faGear } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className='border-t-1 border-gray-400 py-3 rounded-tl-2xl rounded-tr-2xl px-5 fixed bottom-0 w-full bg-white'>
      <nav>
        <ul className='flex items-center font-semibold justify-between'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-gray-600'}`
            }
          >
            Qarzlar
            <FontAwesomeIcon className='text-lg' icon={faDollar} />
          </NavLink>
          <NavLink
            to="/eslatmalar"
            className={({ isActive }) =>
              `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-gray-600'}`
            }
          >
            Eslatmalar
            <FontAwesomeIcon className='text-lg' icon={faClipboard} />
          </NavLink>
          <NavLink
            to="/sozlamalar"
            className={({ isActive }) =>
              `flex flex-col-reverse gap-0.5 items-center ${isActive ? 'text-[#4F39F6]' : 'text-gray-600'}`
            }
          >
            Sozlamalar
            <FontAwesomeIcon className='text-lg' icon={faGear} />
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Header

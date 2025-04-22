import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function AddDebt() {
  return (
    <div>
      <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b-1 border-gray-300 pr-4'>
        <Link to='/qarzlar' className=''>
          <FontAwesomeIcon className='text-lg mr-2' icon={faArrowLeft} />
          <span className='text-2xl'>Ortga</span>
        </Link>
      </div>

      <div className='pt-16 px-4'>
        <div className='flex flex-col justify-center gap-y-3'>
          <input
            id="ism"
            name="ism"
            type="text"
            require
            placeholder='Ism'
            autoComplete="ism"
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          <textarea
            id="desc"
            name="desc"
            require
            placeholder='Izoh'
            autoComplete="desc"
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />

          <div className='flex items-center justify-between'>
            <button className='bg-indigo-600 px-4 max-w-23 w-full py-2 rounded-md text-white '>UZS</button>
            <button className='bg-indigo-600 px-4 max-w-23 w-full py-2 rounded-md text-white '>USD</button>
            <button className='bg-indigo-600 px-4 max-w-23 w-full py-2 rounded-md text-white '>UZS X/R</button>
          </div>
          <input
            id="count"
            name="count"
            type="number"
            require
            placeholder='summa'
            autoComplete="count"
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          <div className='flex items-center gap-3'>

            <input className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600" type="date" name="" id="" />
            <span>to</span>
            <input className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600" type="date" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDebt
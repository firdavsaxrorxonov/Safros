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
    </div>
  )
}

export default AddDebt
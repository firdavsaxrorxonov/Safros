import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

function Settings() {


  const navigate = useNavigate()

  function handleNavigateToLogin() {
    navigate('/')
  }

  return (
    <div className='pt-17 px-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center'>
            <span className='text-lg'>G</span>
          </div>
          <p className='text-xl'>Guest</p>
        </div>
        <button onClick={handleNavigateToLogin} className='px-3 py-2 bg-red-500 text-white flex items-center cursor-pointer gap-2 rounded-lg'><FontAwesomeIcon icon={faDoorOpen} />Chiqish</button>
      </div>
    </div>
  )
}

export default Settings
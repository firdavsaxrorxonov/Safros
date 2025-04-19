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
    <div className='px-2 py-2'>
      <button onClick={handleNavigateToLogin} className='px-2 py-3 bg-red-500 text-white flex items-center gap-2 rounded-lg'><FontAwesomeIcon icon={faDoorOpen} />Chiqish</button>
    </div>
  )
}

export default Settings
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {
  let navigate = useNavigate()
  function handleQuite() {
    navigate('/login')
  }
  return (
    <div>
      <button onClick={handleQuite()} class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition duration-300">
        🔴 Chiqish
      </button>

    </div>
  )
}

export default Settings
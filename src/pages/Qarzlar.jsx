import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Qarzlar() {

  const navigate = useNavigate()

  function handleNavigateToAddDebt() {
    navigate('/addDebt')
  }

  return (
    <div className='pt-16 px-4'>


      <button onClick={handleNavigateToAddDebt} className='w-13 h-13 flex items-center justify-center text-white text-xl rounded-md bg-[#4F39F6] fixed bottom-22 right-6 hover:bg-[#276CED] transition duration-150 cursor-pointer'>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default Qarzlar
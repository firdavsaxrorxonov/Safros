// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function DetailHeader() {
  return (
    <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b-1 border-gray-300 pr-4'>
      <Link to='/'>
        <FontAwesomeIcon className='text-lg mr-2' icon={faArrowLeft} />
        <span className='text-xl'>Ortga</span>
      </Link>
    </div>
  );
}

export default DetailHeader;

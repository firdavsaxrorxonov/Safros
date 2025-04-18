import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <div className='pb-20'>
        <Outlet />         {/* Bu joyga nested route componentlari chiqadi */}
      </div>
      <Header />
    </>
  )
}

export default MainLayout

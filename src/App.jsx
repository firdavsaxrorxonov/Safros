import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import Qarzlar from './pages/Qarzlar'
import Eslatmalar from './pages/Eslatmalar'
import Settings from './pages/Settings'

function App() {
  return (
    <div className=''>
      <Routes>
        {/* Home sahifasini MainLayout ichiga joylashtiramiz */}
        <Route element={<MainLayout />}>
          <Route path='/qarzlar' element={<Qarzlar />} />
          <Route path='/eslatmalar' element={<Eslatmalar />} />
          <Route path='/sozlamalar' element={<Settings />} />
        </Route>

        {/* Login va Register sahifalari uchun MainLayoutni qo'llamaymiz */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App

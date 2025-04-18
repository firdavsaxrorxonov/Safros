import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import Qarzlar from './pages/Qarzlar'
import Eslatmalar from './pages/Eslatmalar'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className=''>
      <Routes>
        {/* Auth routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* MainLayout bilan o‘ralgan sahifalar */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Qarzlar />} />
          <Route path='/eslatmalar' element={<Eslatmalar />} />
          <Route path='/sozlamalar' element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

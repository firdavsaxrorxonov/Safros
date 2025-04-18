import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">404 - Sahifa topilmadi</h1>
      <p className="mt-4">Kechirasiz, siz kiritgan manzil mavjud emas.</p>
      <Link to="/" className="mt-6 inline-block text-blue-600 underline">
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}

export default NotFound

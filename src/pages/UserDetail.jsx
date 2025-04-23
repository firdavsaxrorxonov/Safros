import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function UserDetail() {
  const { userName } = useParams();  // URL'dan userName olish
  console.log('URL param userName:', userName);  // Konsolga chiqarish

  // Agar userName bo'lmasa, xatolikni oldini olish uchun:
  if (!userName) {
    return <div>Foydalanuvchi ismi URL'da berilmagan.</div>;
  }

  // Foydalanuvchining namuna ma'lumotlari
  const users = [
    { name: 'Nodir', balance: 50000, currency: 'usd', date: new Date() },
    { name: 'Kamoliddinjon', balance: -500000, currency: 'so‘m', date: new Date() },
    { name: 'Abduvohid', balance: 500000, currency: 'X/R', date: new Date(), id: 3 },
  ];

  // userName ni katta-kichik harflarga qarab solishtiramiz
  const user = users.find((user) => user.name.toLowerCase() === userName.toLowerCase());

  if (!user) {
    return <div>Foydalanuvchi topilmadi</div>;
  }

  // Valyuta formatlash funksiyasi
  function formatCurrency(amount, currency) {
    const formatted = Math.abs(amount).toLocaleString();
    if (currency === 'usd') return `$${formatted}`;
    if (currency === 'so‘m') return `${formatted} so‘m`;
    if (currency === 'X/R') return `${formatted} X/R`;
    return formatted;
  }


  return (
    <>
      <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b-1 border-gray-300 pr-4'>
        <Link to='/qarzlar'>
          <FontAwesomeIcon className='text-lg mr-2' icon={faArrowLeft} />
          <span className='text-xl'>Ortga</span>
        </Link>
      </div>
      <div className='pt-16 px-4'>
        <h1 className='text-2xl font-semibold'>{user.name} Detallari</h1>
        <p className='mt-2 text-xl'>
          <strong>Balans:</strong> {user.balance < 0 ? '-' : ''} {formatCurrency(user.balance, user.currency)}
        </p>
        <p className='mt-2 text-sm'>
          <strong>Yaratilgan sana:</strong> {user.date.toLocaleString()}
        </p>
        {/* Boshqa foydalanuvchi detallarini qo'shish */}
      </div>
    </>
  );
}

export default UserDetail;

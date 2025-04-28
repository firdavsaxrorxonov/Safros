import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddDebt() {
  const navigate = useNavigate();

  const [ism, setIsm] = useState('');
  const [desc, setDesc] = useState('');
  const [count, setCount] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState('UZS');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');

  const currencyButtons = ['UZS', 'USD', 'UZS X/R'];

  const getButtonClasses = (currency) =>
    selectedCurrency === currency
      ? 'bg-indigo-600 border-2 border-indigo-600 px-4 max-w-23 w-full font-semibold py-2 rounded-md text-white whitespace-nowrap'
      : 'bg-transparent border-2 border-indigo-600 text-black px-4 max-w-23 w-full font-semibold py-2 rounded-md whitespace-nowrap';

  const handleSaveDebts = async () => {
    const token = Cookies.get('Token');  // Cookie'dan tokenni olish

    const data = {
      odam_ismi: ism,
      qarz: count,
      valyuta_turi: selectedCurrency,
      boshlanish_sanasi: startDate,
      yakun_sanasi: dueDate,
    };

    try {
      await axios.post('https://safros.up.railway.app/api/v1/data/qarzlar/', data, {
        headers: {
          Authorization: `Token ${token}`,
          withCredentials: true,
        },
        withCredentials: true,  // Cookie'larni yuborish uchun kerak
      });
      // So'rov muvaffaqiyatli o'tsa, bosh sahifaga qaytish
      navigate('/qarzlar');
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  };

  return (
    <div>
      <div className='bg-white fixed top-0 w-full py-3 px-2.5 border-b-1 border-gray-300 pr-4'>
        <Link to='/qarzlar'>
          <FontAwesomeIcon className='text-lg mr-2' icon={faArrowLeft} />
          <span className='text-xl'>Ortga</span>
        </Link>
      </div>
      <div className='pt-16 px-3 flex justify-center'>
        <div className='flex w-full flex-col justify-center gap-y-3'>
          <input
            id="ism"
            name="ism"
            type="text"
            required
            placeholder='Ism'
            autoComplete="ism"
            value={ism}
            onChange={(e) => setIsm(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          <textarea
            id="desc"
            name="desc"
            required
            placeholder='Izoh'
            autoComplete="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          <div className='flex items-center justify-between gap-2'>
            {currencyButtons.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={getButtonClasses(currency)}
              >
                {currency}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              id="count"
              name="count"
              type="number"
              required
              placeholder='summa'
              autoComplete="count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mt-1 block w-full rounded-md bg-white px-3 py-2 pr-16 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              {selectedCurrency === 'UZS X/R' ? 'X/R' : selectedCurrency}
            </span>
          </div>
          <h2 className='font-semibold'>Muddat</h2>
          <div className='flex items-center gap-3'>
            <input
              className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>gacha</span>
            <input
              className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleSaveDebts}
          className='bg-indigo-600 cursor-pointer px-4 transition duration-150 hover:bg-indigo-500 w-full mx-auto max-w-[358px] py-2 rounded-md fixed bottom-2 text-white'
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}

export default AddDebt;

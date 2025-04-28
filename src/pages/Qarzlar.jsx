import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Qarzlar() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function handleNavigateToAddDebt() {
    navigate('/addDebt');
  }

  useEffect(() => {
    function fetchUsers() {
      const token = Cookies.get('Token');
      console.log(token);
       // Cookie’dan tokenni olish

      axios.get('https://safros.up.railway.app/api/v1/data/qarzlar/', {
        headers: {
          Authorization: `Token b036b540a3ee8de467b1737c04c9ad2b9b659068`,
          withCredentials: true,
        },
      })
        .then((response) => {
          const data = response.data;
          const formattedData = data.map(user => ({
            name: user.odam_ismi,
            balance: user.qarz,
            currency: user.qolgan_summasi,
            date: user.boshlanish_sanasi,
            id: user.id,
          }));
          setUsers(formattedData);
        })
        .catch((error) => {
          console.error('Xatolik yuz berdi:', error);
        });
    }

    fetchUsers();
  }, []);

  function formatCurrency(amount, currency) {
    const formatted = Math.abs(amount).toLocaleString();
    if (currency === 'usd') return `$${formatted}`;
    if (currency === 'so‘m') return `${formatted} so‘m`;
    if (currency === 'X/R') return `${formatted} X/R`;
    return formatted;
  }

  return (
    <div className='pt-17 px-2'>
      <div className='flex flex-col gap-4'>
        {users.map((user) => (
          <div
            key={user.id}
            className='flex items-center justify-between relative cursor-pointer'
            onClick={() => navigate(`/user-detail/${user.name.toLowerCase()}`)}
          >
            <div className='flex items-center gap-2'>
              <div className='w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center'>
                <span className='text-lg text-white font-semibold'>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className='text-xl max-w-[120px] truncate'>{user.name}</p>
            </div>
            <span className='absolute right-0 -top-1 text-xs'>
              {user.date.toLocaleString()}
            </span>
            <p className={`text-xl font-semibold ${user.balance < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {user.balance < 0 ? '-' : ''}
              {formatCurrency(user.balance, user.currency)}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNavigateToAddDebt}
        className='w-13 h-13 flex items-center justify-center text-white text-xl rounded-xl bg-[#4F39F6] fixed bottom-22 right-6 hover:bg-[#276CED] transition duration-150 cursor-pointer'
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default Qarzlar;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/DetailHeader'; // Header komponentini import qilish
import Cookies from 'js-cookie';

function UserDetail() {
  const { id } = useParams();  // URL'dan ID olish
  const [user, setUser] = useState(null);
  const [count, setCount] = useState();   // count ni boshlang'ich qiymati 0 bo'lsa
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    const token = Cookies.get('Token');
    try {
      const response = await fetch(`https://safros.up.railway.app/api/v1/data/qarzlar/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      });

      if (!response.ok) {
        throw new Error('Foydalanuvchi ma\'lumotlarini olishda xatolik');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return (
    <>
      <Header /> {/* Header komponentini har doim ko'rsatish */}
      <div className='pt-16 px-4'>

        {loading ? (
          <div>Yuklanmoqda...</div> // Faqat ma'lumot yuklanayotganda ko'rsatish
        ) : (
          <>
            {user ? (
              <>
                <h3 className='text-lg font-semibold'><span className='text-base text-gray-500'>Ism: </span>{user.odam_ismi} </h3>

                <p className='mt-2 text-base'>
                  <span className='text-gray-500'>Izoh: </span> {user.desc}
                </p>
                <p className='mt-2 text-base'><span className='text-gray-500'>Umumiy summa: </span>{user.qarz} {user.valyuta_turi}</p>
                <p className='mt-2 text-base'>
                  <span className='text-gray-500'>Ro'yhatdan o'tgan sana:</span> {user.boshlanish_sanasi}
                </p>
                <p className='mt-2 text-base'>
                  <span className='text-gray-500'>Muddati:</span> {user.yakun_sanasi}
                </p>
                <div className="relative mt-5">
                  <input
                    id="count"
                    name="count"
                    type="number"
                    required
                    placeholder="Summa"
                    autoComplete="off"
                    value={count}
                    onChange={(e) => {
                      let val = e.target.value;
                      setCount(val);  // countni yangilash
                    }}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mt-1 block w-full rounded-md bg-white px-3 py-2 pr-16 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    {user ? user.valyuta_turi : 'Yuklanmoqda'}
                  </span>

                </div>

              </>
            ) : (
              <div>Foydlanuvchi topilmadi</div>
            )}

          </>
        )}
      </div >
      <div className='fixed bottom-0 py-4 w-full flex items-center bg-white'>
        <button
          className="bg-indigo-600 cursor-pointer px-4 transition duration-150 hover:bg-indigo-500 w-full mx-auto max-w-[358px] py-2 rounded-md text-white"
        >
          {loading ? "Yuborilmoqda..." : "Saqlash"}
        </button>
      </div>
    </>
  );
}


export default UserDetail;

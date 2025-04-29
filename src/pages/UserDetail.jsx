import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/DetailHeader"; // Header komponentini import qilish
import Cookies from "js-cookie";
import axios from "axios";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserDetail() {
  const navigate = useNavigate();

  const { id } = useParams(); // URL'dan ID olish
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(); // count ni boshlang'ich qiymati 0 bo'lsa
  const [loading, setLoading] = useState(true);
  const [ploading, setPloading] = useState(false);
  const token = Cookies.get("Token");

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://safros.up.railway.app/api/v1/data/qarzlar/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );

      if (!response.ok) {
        throw new Error("Foydalanuvchi ma'lumotlarini olishda xatolik");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const handlePayment = async () => {
    setPloading(true);
    setCount("");
    try {
      await axios.post(
        `https://safros.up.railway.app/api/v1/data/tolovlar/`,
        {
          summa: count,
          qarz_id: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );
      fetchUserDetails();
      setPloading(false);
    } catch (error) {
      console.log(error);
      setPloading(false);
    }
  };

  return (
    <>
      <Header /> {/* Header komponentini har doim ko'rsatish */}
      <div className="pt-16 px-4">
        {loading ? (
          <div className="w-full min-h-[90vh] flex items-center justify-center">
            <span className="text-indigo-600 font-bold">Yuklanmoqda...</span>
          </div> // Faqat ma'lumot yuklanayotganda ko'rsatish
        ) : (
          <>
            {user ? (
              <>
                <h3 className="text-lg font-semibold">
                  <span className="text-base text-gray-500">Ism: </span>
                  {user.odam_ismi}{" "}
                </h3>

                <p className="mt-2 text-base">
                  <span className="text-gray-500">Izoh: </span> {user.desc}
                </p>
                <p className="mt-2 text-base">
                  <span className="text-gray-500">Umumiy summa: </span>
                  <span
                    className={`font-bold text-xl ${
                      user.qolgan_summasi > 0
                        ? "text-green-600"
                        : user.qolgan_summasi < 0
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {user.qolgan_summasi} {user.valyuta_turi}
                  </span>
                </p>
                <p className="mt-2 text-base">
                  <span className="text-gray-500">Ro'yhatdan o'tgan sana:</span>{" "}
                  {user.boshlanish_sanasi}
                </p>
                <p className="mt-2 text-base">
                  <span className="text-gray-500">Muddati:</span>{" "}
                  {user.yakun_sanasi}
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
                      setCount(val); // countni yangilash
                    }}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mt-1 block w-full rounded-md bg-white px-3 py-2 pr-16 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    {user ? user.valyuta_turi : "Yuklanmoqda"}
                  </span>
                </div>
                <div>
                  <ul className="mt-[30px] max-h-[300px] overflow-y-scroll scrollbar-hide">
                    {user.tolovlar.map((payments) => (
                      <li
                        className={
                          payments.summa > 0
                            ? "bg-green-200 my-1"
                            : "bg-red-200 my-1"
                        }
                        key={payments.id}
                      >
                        <div className="flex justify-between p-4">
                          <p className="font-semibold">
                            {payments.summa} {user.valyuta_turi}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faClockRotateLeft} />{" "}
                            {new Date(payments.tolangan_vaqt).toLocaleString(
                              "uz-UZ",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div>Foydlanuvbchi topilmadi</div>
            )}
          </>
        )}
      </div>
      <div className="fixed bottom-0 py-4 w-full flex items-center bg-white">
        <button
          disabled={!count}
          onClick={handlePayment}
          className="bg-indigo-600 cursor-pointer px-4 mx-4 transition duration-150 hover:bg-indigo-500 w-full  py-2 rounded-md text-white"
        >
          {ploading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </>
  );
}

export default UserDetail;

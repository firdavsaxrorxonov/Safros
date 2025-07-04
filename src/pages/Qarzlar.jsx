import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";

function Qarzlar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const updated = searchParams.get("updated");

  const handleNavigateToAddDebt = () => {
    navigate("/addDebt");
  };

  const fetchUsers = async () => {
    const token = Cookies.get("safros-token");
    try {
      const response = await fetch(
        "https://safros.up.railway.app/api/v1/data/qarzlar/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );

      if (!response.ok) {
        throw new Error("Tarmoqqa ulanishda xatolik");
      }

      const data = await response.json();
      const formattedData = data.map((user) => ({
        name: user.odam_ismi,
        balance: user.qolgan_summasi,
        currency: user.valyuta_turi,
        date: user.boshlanish_sanasi,
        id: user.id,
      }));

      setUsers(formattedData);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (updated) {
      fetchUsers();
    }
  }, [updated]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Qidiruv so'ziga asoslangan foydalanuvchilarni filtrlaymiz
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-17 px-2">
      <Header onSearch={setSearchQuery} />{" "}
      {/* setSearchQuery funksiyasini prop sifatida uzatamiz */}
      <div className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                </div>
                <div className="h-5 w-16 bg-gray-300 rounded"></div>
              </div>
            ))
          : filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between relative cursor-pointer"
                onClick={() => navigate(`/user-detail/${user.id}`)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-lg text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xl max-w-[120px] truncate">{user.name}</p>
                </div>
                <span className="absolute right-0 -top-1 text-xs">
                  {new Date(user.date).toLocaleDateString()}
                </span>
                <p
                  className={`text-xl font-semibold ${
                    user.balance < 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {user.balance < 0 ? "-" : ""}
                  {Math.abs(user.balance)} {user.currency.toUpperCase()}
                </p>
              </div>
            ))}
      </div>
      <button
        onClick={handleNavigateToAddDebt}
        className="w-13 h-13 flex items-center justify-center text-white text-xl rounded-xl bg-[#4F39F6] fixed bottom-22 right-6 hover:bg-[#276CED] transition duration-150 cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default Qarzlar;

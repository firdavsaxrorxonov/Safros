import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function AddDebt() {
  const navigate = useNavigate();

  const [ism, setIsm] = useState("");
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("uzs");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [transactionType, setTransactionType] = useState("Qarz berish");
  const [loading, setLoading] = useState(false);

  const currencyButtons = ["uzs", "usd", "h/r"];

  const getButtonClasses = (currency) =>
    selectedCurrency === currency
      ? "bg-indigo-600 border-2 border-indigo-600 px-4 max-w-23 w-full font-semibold py-2 rounded-md text-white whitespace-nowrap"
      : "bg-transparent text-indigo-600 border-2 border-indigo-600 text-black px-4 max-w-23 w-full font-semibold py-2 rounded-md whitespace-nowrap";

  const isFormValid = () => {
    return ism.trim() && count && startDate && dueDate;
  };

  const handleSaveDebts = async () => {
    if (!isFormValid()) return;

    const token = Cookies.get("Token");

    try {
      setLoading(true);
      await axios.post(
        "https://safros.up.railway.app/api/v1/data/qarzlar/",
        {
          odam_ismi: ism,
          qarz: parseFloat(count),
          valyuta_turi: selectedCurrency,
          boshlanish_sanasi: startDate,
          yakun_sanasi: dueDate,
          izoh: desc.trim() || "",
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );

      setIsm("");
      setDesc("");
      setCount("");
      setSelectedCurrency("uzs");
      setStartDate("");
      setDueDate("");
      setTransactionType("Qarz berish");

      navigate("/qarzlar");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white fixed top-0 w-full py-3 px-2.5 border-b border-gray-300 pr-4">
        <Link to="/qarzlar" className="flex items-center gap-2">
          <FontAwesomeIcon className="text-lg" icon={faArrowLeft} />
          <span className="text-xl">Ortga</span>
        </Link>
      </div>

      <div className="pt-16 px-3 flex justify-center">
        <div className="flex w-full flex-col justify-center gap-y-3">
          <input
            id="ism"
            name="ism"
            type="text"
            required
            placeholder="Ism"
            autoComplete="off"
            value={ism}
            onChange={(e) => setIsm(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />

          <textarea
            id="desc"
            name="desc"
            placeholder="Izoh (ixtiyoriy)"
            autoComplete="off"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />

          <div className="flex items-center justify-between gap-2">
            {currencyButtons.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                type="button"
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
              placeholder="Summa"
              autoComplete="off"
              value={count}
              onChange={(e) => {
                let val = e.target.value;
                if (transactionType === "Qarz olish") {
                  val = val.replace("-", "");
                  setCount("-" + val);
                } else {
                  setCount(val);
                }
              }}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mt-1 block w-full rounded-md bg-white px-3 py-2 pr-16 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              {selectedCurrency}
            </span>
          </div>

          <h2 className="font-semibold">Muddat</h2>

          <div className="flex items-center gap-3">
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

          <select
            value={transactionType}
            onChange={(e) => {
              const selected = e.target.value;
              setTransactionType(selected);
              if (selected === "Qarz olish" && count && !count.startsWith("-")) {
                setCount("-" + count);
              }
              if (selected === "Qarz berish" && count.startsWith("-")) {
                setCount(count.slice(1));
              }
            }}
            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          >
            <option value="Qarz berish">Qarz berish</option>
            <option value="Qarz olish">Qarz olish</option>
          </select>
        </div>

        <button
          onClick={handleSaveDebts}
          disabled={!isFormValid() || loading}
          className={`bg-indigo-600 cursor-pointer px-4 transition duration-150 hover:bg-indigo-500 w-full mx-auto max-w-[358px] py-2 rounded-md fixed bottom-2 text-white ${!isFormValid() || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Yuborilmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
}

export default AddDebt;

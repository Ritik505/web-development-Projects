"use client";
import React, { useEffect, useState } from "react";
import { CustomSelect } from "./CustomSelect";

const countryList: Record<string, string> = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW",
};

const DEFAULT_FROM = "USD";
const DEFAULT_TO = "INR";

export default function Home() {
  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState<string>(DEFAULT_FROM);
  const [to, setTo] = useState<string>(DEFAULT_TO);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;

  const fetchRate = async () => {
    let amtVal = parseFloat(amount);
    if (isNaN(amtVal) || amtVal < 1) {
      amtVal = 1;
      setAmount("1");
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
      );
      if (!res.ok) throw new Error("Network response failed.");
      const data = await res.json();
      if (data.result === "error") throw new Error(data["error-type"]);
      const rate = data.conversion_rates[to];
      if (!rate) throw new Error(`Rate for ${to} not found.`);
      const finalAmount = (amtVal * rate).toFixed(2);
      setResult(`${amtVal} ${from} = ${finalAmount} ${to}`);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [from, to]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRate();
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const options = Object.entries(countryList).map(([code, country]) => ({ code, country }));

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div className="w-full max-w-md bg-gray-900/70 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl animate-fadeInUp">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 text-gray-100 tracking-tight drop-shadow-lg">Currency Converter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 sm:mb-8">
            <p className="text-base font-semibold text-gray-300 mb-2">Enter Amount</p>
            <input
              className="amount-input w-full border border-gray-600 rounded-2xl bg-gray-700/80 text-gray-100 text-lg sm:text-xl h-12 sm:h-14 px-4 sm:px-5 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition shadow-md placeholder-gray-400"
              type="number"
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={loading}
              placeholder="Amount"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1">
              <CustomSelect
                options={options}
                value={from}
                onChange={setFrom}
                disabled={loading}
                label="From"
              />
            </div>
            <div className="flex justify-center items-center my-2 sm:my-0">
              <button
                type="button"
                className="flex items-center justify-center rounded-full w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-white text-2xl shadow-lg border-2 border-blue-300 hover:scale-110 hover:from-blue-600 hover:to-blue-400 hover:via-blue-500 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                onClick={swapCurrencies}
                disabled={loading}
                aria-label="Swap currencies"
                tabIndex={0}
              >
                <i className="fa-solid fa-arrow-right-arrow-left" style={{ transform: 'rotate(90deg)', transition: 'color 0.2s' }} />
              </button>
            </div>
            <div className="flex-1">
              <CustomSelect
                options={options}
                value={to}
                onChange={setTo}
                disabled={loading}
                label="To"
              />
            </div>
          </div>
          <div className="msg my-6 sm:my-8 p-4 sm:p-5 text-center rounded-2xl min-h-[2.5rem] bg-gray-700/80 border border-gray-600 text-gray-100 font-semibold text-base sm:text-lg shadow-md transition">
            {loading ? (
              <span className="inline-flex items-center gap-2"><span className="loader border-2 border-t-white border-blue-400 rounded-full w-6 h-6 animate-spin"></span> Getting exchange rate...</span>
            ) : error ? (
              <span className="text-red-400">Error: {error}</span>
            ) : result ? (
              <span>{result}</span>
            ) : (
              <span>Enter amount and select currencies</span>
            )}
          </div>
          <button
            type="submit"
            className={`w-full h-12 sm:h-14 rounded-2xl text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-xl transition-all flex items-center justify-center relative border-2 border-blue-300 hover:from-blue-600 hover:to-blue-400 hover:via-blue-500 hover:scale-[1.02] active:scale-95 duration-200 ${loading ? "opacity-70 cursor-wait" : "hover:brightness-110"}`}
            disabled={loading}
          >
            <span className={`button-text transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}>Refresh</span>
            {loading && <span className="loader border-2 border-t-white border-blue-400 rounded-full w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"></span>}
          </button>
        </form>
      </div>
    </div>
  );
}

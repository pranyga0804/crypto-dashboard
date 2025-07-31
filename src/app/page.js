"use client";

import { useEffect, useState } from "react";
import { getMarketData } from "../lib/api";
import CoinTable from "../components/CoinTable";
import Link from "next/link";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketData();
        setCoins(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(results);
  }, [searchTerm, coins]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#00ccff] drop-shadow-md">Crypto Dashboard</h1>
          <Link href="/watchlist" className="text-[#00ccff] hover:underline text-lg">
            ⭐ My Watchlist
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a coin (e.g., Bitcoin, ETH)..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#161B22] border border-[#2F3A48] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ccff] transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#161B22] rounded-xl shadow-lg p-4 overflow-x-auto">
          {loading ? (
            <p className="text-gray-400">Loading data...</p>
          ) : (
            <CoinTable coins={filteredCoins} />
          )}
        </div>
      </div>
    </div>
  );
}

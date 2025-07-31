"use client";

import { useEffect, useState } from "react";
import { getMarketData } from "../../lib/api";
import CoinTable from "../../components/CoinTable";
import Link from "next/link";

export default function WatchlistPage() {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketData();
        const filtered = data.filter((coin) => watchlist.includes(coin.id));
        setCoins(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (watchlist.length > 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [watchlist]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#00ccff]">My Watchlist</h1>
          <Link href="/" className="text-[#00ccff] hover:underline text-lg">← Back to Dashboard</Link>
        </div>

        <div className="bg-[#161B22] rounded-xl shadow-lg p-4 overflow-x-auto">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : coins.length === 0 ? (
            <p className="text-gray-400">No favorites yet. Go add some ⭐!</p>
          ) : (
            <CoinTable coins={coins} />
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CoinRow({ coin }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  const toggleWatchlist = (id) => {
    let updated = [...watchlist];
    if (watchlist.includes(id)) {
      updated = updated.filter((coinId) => coinId !== id);
    } else {
      updated.push(id);
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const isFavorite = watchlist.includes(coin.id);

  return (
    <tr className="border-b border-[#2F3A48] hover:bg-[#1B222D] transition rounded-lg">
      <td className="p-3">{coin.market_cap_rank}</td>
      <td className="p-3 flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-7 h-7" />
        <div>
          <Link href={`/coin/${coin.id}`} className="text-[#00ccff] hover:underline font-medium">
            {coin.name}
          </Link>
          <p className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </td>
      <td className="p-3">${coin.current_price.toLocaleString()}</td>
      <td className={`p-3 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="p-3">${coin.market_cap.toLocaleString()}</td>
      <td className="p-3">${coin.total_volume.toLocaleString()}</td>
      <td className="p-3">
        <button onClick={() => toggleWatchlist(coin.id)}>
          {isFavorite ? "⭐" : "☆"}
        </button>
      </td>
    </tr>
  );
}

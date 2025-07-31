"use client";

import { useEffect, useState } from "react";
import { getCoinDetails, getCoinMarketChart } from "../../../lib/api";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const coinData = await getCoinDetails(id);
        const marketChart = await getCoinMarketChart(id, days);
        setCoin(coinData);
        setChartData(marketChart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, days]);

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (!coin) return <p className="p-4 text-white">Coin not found.</p>;

  const prices = chartData.prices.map(([timestamp, price]) => price);
  const labels = chartData.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString());

  const data = {
    labels,
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: prices,
        borderColor: "#00ccff",
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
        backgroundColor: "rgba(0, 204, 255, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#00ccff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
          autoSkip: true,
          maxTicksLimit: 10,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
      y: {
        ticks: {
          color: "#fff",
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00ccff] mb-4">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#161B22] p-4 rounded-xl shadow">
            <p className="mb-2">
              Current Price: <span className="text-[#00ccff]">${coin.market_data.current_price.usd.toLocaleString()}</span>
            </p>
            <p className="mb-2">Market Cap Rank: #{coin.market_cap_rank}</p>
            <p className="mb-2">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p className="mb-2">Total Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</p>
            <p>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</p>
          </div>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            {[1, 7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg border ${days === d ? 'bg-[#00ccff] text-black' : 'border-[#2F3A48] text-white'} transition hover:bg-[#00ccff] hover:text-black`}
              >
                {d === 1 ? '24h' : `${d}d`}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#161B22] p-4 rounded-xl shadow">
          <div className="relative h-[400px] w-full">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

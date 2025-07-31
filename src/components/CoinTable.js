import CoinRow from "./CoinRow";

export default function CoinTable({ coins }) {
  return (
    <table className="w-full border-collapse text-sm md:text-base">
      <thead>
        <tr className="border-b border-[#2F3A48] text-[#00ccff] uppercase text-left">
          <th className="p-3">#</th>
          <th className="p-3">Coin</th>
          <th className="p-3">Price</th>
          <th className="p-3">24h %</th>
          <th className="p-3">Market Cap</th>
          <th className="p-3">Volume</th>
          <th className="p-3">Watchlist</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <CoinRow key={coin.id} coin={coin} />
        ))}
      </tbody>
    </table>
  );
}

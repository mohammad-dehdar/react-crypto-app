import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className="flex justify-center mt-12 mb-24 min-h-[1000px]">
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="2"
          strokeColor="#3874ff"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b-2">
              <tr className="text-lg text-left pb-5">
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">24H</th>
                <th className="px-4 py-2">Total Volume</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <TableRow key={coin.id} coins={coin} currency={currency} setChart={setChart} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coins, currency, setChart }) => {
  const {
    id,
    image,
    symbol,
    name,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
  } = coins;

  const showChartHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency));
      const json = await res.json();
      setChart({ ...json, coins });
    } catch (err) {
      setChart(null);
    }
  };

  return (
    <tr className="h-20 border-b border-gray-800 hover:bg-gray-100 transition-colors">
      <td className="px-4 py-2">
        <div className="flex items-center cursor-pointer" onClick={showChartHandler}>
          <img className="w-6 h-6 mr-2.5" src={image} alt="" />
          <span className="uppercase text-gray-600 font-extrabold">{symbol}</span>
        </div>
      </td>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">
        {currency === "jpy" ? "¥ " : currency === "eur" ? "€ " : "$ "}
        {current_price.toLocaleString()}
      </td>
      <td className={`px-4 py-2 ${price_change > 0 ? "text-green-500" : "text-red-500"}`}>
        {price_change.toFixed(2)}%
      </td>
      <td className="px-4 py-2">{total_volume.toLocaleString()}</td>
      <td className="px-4 py-2">
        <img className="w-24 h-10" src={price_change > 0 ? chartUp : chartDown} alt="price_change_percentage_24h" />
      </td>
    </tr>
  );
};
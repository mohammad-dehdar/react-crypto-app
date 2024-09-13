
import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className="flex justify-center mt-[50px] mb-[100px] min-h-[1000px]">
      {isLoading ?
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
        /> : (
          <table className="w-full border-collapse max-md:block max-md:overflow-x-scroll">
            <thead className="border-b-2">
              <tr className="*:text-lg text-left  *:max-md:px-2.5 *:pb-5">
                <th>Coin</th>
                <th>Name</th>
                <th>Price</th>
                <th>24H</th>
                <th>Total Volume</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) =>
                <TableRow key={coin.id} coins={coin} currency={currency} setChart={setChart} />
              )}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default TableCoin

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
      const res = await fetch(marketChart(id, currency))
      const json = await res.json();
      setChart({ ...json, coins })
    } catch (err) {
      setChart(null)
    }
  }
  return (
    <tr className="h-20 border border-transparent border-b-gray-800 *:max-md:px-2.5">
      <td>
        <div className='flex  items-center cursor-pointer' onClick={showChartHandler}>
          <img className='w-[25px] h-[25px] mr-2.5' src={image} alt="" />
          <span className='uppercase text-gray-600 font-extrabold'>{symbol}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{currency === "jpy" ? "¥ " : currency === "eur" ? "€ " : "$ "}{current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? "text-green-300" : "text-rose-500"}>{price_change.toFixed(2)}%</td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img className="min-w-[100px] min-h-[40px]"
          src={price_change > 0 ? chartUp : chartDown}
          alt="price_change_percentage_24h" />
      </td>
    </tr>
  )
}
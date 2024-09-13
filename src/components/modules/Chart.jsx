import { useState } from "react";
import { convertData } from "../../helpers/convertData";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices")

  const typeHandler = ((e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase().replace(" ","_");
      setType(type);
    }
  })
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm">
      <span className="inline-block font-semibold bg-red-600 mt-8 ml-8 text-white w-8 h-8 text-center text-3xl leading-8 rounded-xl cursor-pointer transition-all ease-out hover:bg-red-500 hover:shadow-md" onClick={() => setChart(null)}>X</span>
      <div className="w-[800px] m-auto p-5 mt-[50px] bg-slate-900/60 border backdrop-blur-lg border-slate-700 rounded-2xl">
        <div className="flex items-center mb-[30px] mx-2.5">
          <img src={chart.coins.image} className="w-10 h-10 mr-5"/>
          <p className="text-xl font-bold">{chart.coins.name}</p>
        </div>
        <div className="w-[760px] h-[300px]">
          <CharComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className="mt-[30px] *:border *:border-blue-400 *:px-1 *:py-1 *:rounded-md  *:mr-4" onClick={typeHandler}>
          <button className={type === "prices" && "bg-blue-400"}>prices</button>
          <button className={type === "market_caps" && "bg-blue-400"}>market caps</button>
          <button className={type === "total_volumes" && "bg-blue-400"}>total volumes</button>
        </div>
        <div className="flex justify-between mt-5 *:flex *:space-x-2 *:items-center  *:px-1 *:py-1 *:rounded-md">
          <div>
            <p className="text-lg text-blue-400 font-bold ">prices</p><span>${chart.coins.current_price}</span>
          </div>
          <div>
            <p className="text-lg text-blue-400 font-bold ">ATH</p><span>${chart.coins.ath}</span>
          </div>
          <div>
            <p className="text-lg text-blue-400 font-bold ">market caps</p><span>{chart.coins.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart

const CharComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth='2px' />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey={Date} hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
import { useState } from "react";
import { convertData } from "../../helpers/convertData";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-4xl m-auto p-5 mt-[50px] bg-slate-900/60 border backdrop-blur-lg border-slate-700 rounded-2xl">
        <span
          className="absolute top-6 left-[92%] inline-block font-semibold bg-red-600 text-white w-8 h-8 text-center text-3xl leading-8 rounded-xl cursor-pointer transition-all ease-out hover:bg-red-500 hover:shadow-md"
          onClick={() => setChart(null)}
        >
          X
        </span>
        <div className="flex items-center mb-[30px] mx-2.5">
          <img src={chart.coins.image} className="w-10 h-10 mr-5" />
          <p className="text-xl font-bold">{chart.coins.name}</p>
        </div>
        <div className="w-full h-[300px]">
          <CharComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className="mt-[30px] flex justify-center space-x-4" onClick={typeHandler}>
          <button className={`${type === "prices" ? "bg-blue-400" : ""} px-4 py-2 rounded-md`}>prices</button>
          <button className={`${type === "market_caps" ? "bg-blue-400" : ""} px-4 py-2 rounded-md`}>market caps</button>
          <button className={`${type === "total_volumes" ? "bg-blue-400" : ""} px-4 py-2 rounded-md`}>total volumes</button>
        </div>
        <div className="flex flex-wrap justify-between mt-5 space-y-4 md:space-y-0">
          <div className="flex-1">
            <p className="text-lg text-blue-400 font-bold">prices</p>
            <span>${chart.coins.current_price}</span>
          </div>
          <div className="flex-1">
            <p className="text-lg text-blue-400 font-bold">ATH</p>
            <span>${chart.coins.ath}</span>
          </div>
          <div className="flex-1">
            <p className="text-lg text-blue-400 font-bold">market caps</p>
            <span>{chart.coins.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const CharComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px" />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey={Date} hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
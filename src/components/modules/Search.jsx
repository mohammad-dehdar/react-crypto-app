import { useEffect, useState } from "react"
import { searchCoin } from "../../services/cryptoApi"
import { RotatingLines } from "react-loader-spinner"

function Search({ currency, setCurrency }) {
    const [text, setText] = useState("")
    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        setCoins([])
        if (!text) {
            setIsLoading(false)
            return;
        };

        const search = async () => {
            try {
                const res = await fetch(searchCoin(text), { signal: controller.signal })
                const json = await res.json();
                console.log(json);
                if (json.coins) {
                    setIsLoading(false);
                    setCoins(json.coins)
                } else {
                    alert(json.status.error_message)
                }
            } catch (e) {
                if (e.name !== "AbortError") {
                    alert(e.message)
                }
            }
        }

        setIsLoading(true)
        search()
        return () => controller.abort();
    }, [text])

    return (
        <div className='relative bg-slate-700 rounded-md w-[300px] h-10'>
            <div className="flex justify-between h-full">
                <input
                    type="text"
                    className='bg-transparent focus:outline-none text-gray-300 pl-4'
                    placeholder="search..."
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                <select className='text-white font-light text-sm bg-gray-50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit bg-transparent *:cursor-pointer' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="usd" className="text-black select-none">USD</option>
                    <option value="eur" className="text-black select-none">EUR</option>
                    <option value="jpy" className="text-black select-none">JPY</option>
                </select>
            </div>
            {(!!coins.length || isLoading)&& 
            (
                <div className=" absolute text-center top-14 w-[300px] h-[400px] rounded-md overflow-y-scroll no-scrollbar bg-gray-900 border border-gray-600 p-5">
                {isLoading &&
                    <RotatingLines
                        width="50px"
                        height="50px"
                        strokeWidth="2"
                        strokeColor="#3874ff"
                    />
                }
                <ul>
                    {coins.map(coin =>
                        <li
                            key={coin.id}
                            className="flex items-center gap-1 mb-5 p-2 rounded-lg shadow-md border border-gray-700 transition-all hover:bg-gray-700 "
                        >
                            <img src={coin.thumb} alt={coin.name} className="mr-2"/>
                            <p className="text-sm">{coin.name}</p>
                        </li>)}
                </ul>
            </div>
            )
            }
        </div>
    )
}

export default Search
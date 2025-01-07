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
        <div className='relative bg-slate-700 rounded-md w-full max-w-md mx-auto h-12'>
            <div className="flex justify-between items-center h-full px-2">
                <input
                    type="text"
                    className='bg-transparent focus:outline-none text-gray-300 flex-grow mr-2'
                    placeholder="Search for a cryptocurrency..."
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                <select className='text-white font-light text-sm bg-gray-50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-transparent cursor-pointer' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="usd" className="text-black">USD</option>
                    <option value="eur" className="text-black">EUR</option>
                    <option value="jpy" className="text-black">JPY</option>
                </select>
            </div>
            {(!!coins.length || isLoading) && (
                <div className="absolute text-center top-14 w-full max-w-md mx-auto h-[400px] rounded-md overflow-y-scroll no-scrollbar bg-gray-900 border border-gray-600 p-5 mt-2">
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <RotatingLines
                                width="50px"
                                height="50px"
                                strokeWidth="2"
                                strokeColor="#3874ff"
                            />
                        </div>
                    )}
                    <ul>
                        {coins.map(coin => (
                            <li
                                key={coin.id}
                                className="flex items-center gap-2 mb-4 p-2 rounded-lg shadow-md border border-gray-700 transition-all hover:bg-gray-700"
                            >
                                <img src={coin.thumb} alt={coin.name} className="w-8 h-8"/>
                                <p className="text-sm text-gray-300">{coin.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Search
import { useState } from "react"


function Pagination({page,setPage}) {
    const prevHandler = () => {
        if (page <= 1) return;
        setPage((page) => page - 1)
    }
    const nextHandler = () => {
        if (page >= 10) return;
        setPage((page) => page + 1)
    }

    return (
        <div className="w-[400px] flex justify-between items-center m-auto mb-[100px]">

            <button className="w-20 bg-blue-400 text-white py-[5px] px-2.5 rounded-md cursor-pointer text-sm" onClick={prevHandler}>Prev</button>
            <p className={page !== 1 ? "inline-block border border-blue-400 w-[25px] text-center rounded-md" : "bg-blue-400 inline-block border border-blue-400 w-[25px] text-center rounded-md opacity-50"}>1</p>
            <p className={page !== 2 ? "inline-block border border-blue-400 w-[25px] text-center rounded-md" : "bg-blue-400 inline-block border border-blue-400 w-[25px] text-center rounded-md opacity-50"}>2</p>
            <span className="flex">
                ...
                {page > 2 && page < 9 && <><p className="bg-blue-400 inline-block border border-blue-400 w-[25px] text-center rounded-md opacity-50">{page}</p></>}
                ...
            </span>
            <p className={page !== 9 ? "inline-block border border-blue-400 w-[25px] text-center rounded-md" : "bg-blue-400 inline-block border border-blue-400 w-[25px] text-center rounded-md opacity-50"}>9</p>
            <p className={page !== 10 ? "inline-block border border-blue-400 w-[25px] text-center rounded-md" : "bg-blue-400 inline-block border border-blue-400 w-[25px] text-center rounded-md opacity-50"}>10</p>
            <button className="w-20 bg-blue-400 text-white py-[5px] px-2.5 rounded-md cursor-pointer text-sm" onClick={nextHandler}>Next</button>
        </div>
    )
}

export default Pagination
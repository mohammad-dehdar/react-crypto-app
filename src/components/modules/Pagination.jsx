import { useState } from "react";

function Pagination({ page, setPage }) {
    const totalPages = 10;

    const prevHandler = () => {
        if (page <= 1) return;
        setPage((page) => page - 1);
    };

    const nextHandler = () => {
        if (page >= totalPages) return;
        setPage((page) => page + 1);
    };

    const renderPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, page - 1);
        let endPage = Math.min(totalPages, page + 1);

        if (page === 1) {
            endPage = Math.min(totalPages, 3);
        } else if (page === totalPages) {
            startPage = Math.max(1, totalPages - 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <p
                    key={i}
                    className={`inline-block border border-blue-400 w-[25px] text-center rounded-md cursor-pointer ${page === i ? "bg-blue-400 text-white" : ""}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </p>
            );
        }
        return pages;
    };

    return (
        <div className="w-full flex justify-center items-center m-auto mb-[100px] space-x-2">
            <button
                className="w-20 bg-blue-400 text-white py-[5px] px-2.5 rounded-md cursor-pointer text-sm disabled:opacity-50"
                onClick={prevHandler}
                disabled={page <= 1}
            >
                Prev
            </button>
            <div className="flex space-x-1">
                {renderPageNumbers()}
            </div>
            <button
                className="w-20 bg-blue-400 text-white py-[5px] px-2.5 rounded-md cursor-pointer text-sm disabled:opacity-50"
                onClick={nextHandler}
                disabled={page >= totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
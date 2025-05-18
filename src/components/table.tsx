'use client';
import { useState } from "react";
import { Star, Trash2, FileSearch, ChevronLeft, ChevronRight, } from "lucide-react";
import { Document } from "@/types/document";
import { Button } from "./ui/button";

interface DocumentTableProps {
    documents: Document[]
}

export default function DocumentsTable({ documents }: DocumentTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState(documents);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleFavorite = (id: number) => {
        setData(data.map(item =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
        ));
    };

    const deleteItem = (id: number) => {
        setData(data.filter(item => item.id !== id));
    };

    const viewDetails = (id: number) => {
        console.log(`Viewing details for item ${id}`);
    };
    const renderPaginationButtons = () => {
        const buttons = [];

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3  py-1 mx-1 rounded ${currentPage === i
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        : " text-gray-900 bg-transparent hover:bg-gray-300"
                        }`}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    const getPercentageColor = (percentage: number) => {
        if (percentage < 30) return "text-green-600";
        if (percentage < 70) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="w-full">
            <div className="rounded-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Dosya İsmi</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tip </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tarih</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Yüzde</th>
                            <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">
                                    <div className="flex items-center">
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-500">{item.date}</td>
                                <td className="py-3 px-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div
                                                className={`h-2.5 rounded-full ${item.percentage < 30 ? "bg-green-500" :
                                                    item.percentage < 70 ? "bg-yellow-500" : "bg-red-500"
                                                    }`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-medium ${getPercentageColor(item.percentage)}`}>
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => toggleFavorite(item.id)}
                                            className={`p-1 rounded-full hover:bg-gray-100 ${item.favorite ? "text-yellow-500" : "text-gray-400 hover:text-gray-500"}`}
                                        >
                                            <Star className="w-5 h-5" fill={item.favorite ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={() => viewDetails(item.id)}
                                            className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                                        >
                                            <FileSearch className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="p-1 rounded-full text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {documents.length > 5 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="mx-2 rounded border-gray-300 p-1"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            Her sayfada
                        </span>
                    </div>

                    <div className="text-sm text-gray-700">
                        {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of {data.length}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`rounded p-1 ${currentPage === 1
                                ? "text-gray-900 bg-transparent "
                                : "text-gray-900 hover:bg-gray-100 "
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        {renderPaginationButtons()}

                        <Button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`rounded bg-transparent p-1 ${currentPage === totalPages
                                ? "text-gray-300"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
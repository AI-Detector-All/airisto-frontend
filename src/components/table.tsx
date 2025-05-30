'use client';
import { useState } from "react";
import { Star, Trash2, ChevronLeft, ChevronRight, Download, } from "lucide-react";
import { Document } from "@/types/document";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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

    // const toggleFavorite = (id: number) => {
    //     setData(data.map(item =>
    //         item.id === id ? { ...item, favorite: !item.favorite } : item
    //     ));
    // };

    const deleteItem = (id: string) => {
        setData(data.filter(item => item.analysisId !== id));
    };

    const download = (id: string, isOutput: boolean) => {
        console.log(`Viewing details for item ${id} and isOutput ${isOutput}`);
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
                            <tr key={item.analysisId} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">
                                    <div className="flex items-center">
                                        <span className="font-medium">{item.title ? item.title : "İsimsiz"}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                                        AI Detector
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-500"> Date </td>
                                <td className="py-3 px-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div
                                                className={`h-2.5 rounded-full ${parseInt(item.aiPercent) < 30 ? "bg-green-500" :
                                                    parseInt(item.aiPercent) < 70 ? "bg-yellow-500" : "bg-red-500"
                                                    }`}
                                                style={{ width: `${parseInt(item.aiPercent)}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-medium ${getPercentageColor(parseInt(item.aiPercent))}`}>
                                            {parseInt(item.aiPercent)}%
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <TooltipProvider>
                                        <div className="flex justify-center space-x-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        // onClick={() => toggleFavorite(item.id)}
                                                        className="p-1 rounded-full hover:bg-gray-100"
                                                    >
                                                        <Star className="w-5 h-5" fill="currentColor" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Favorilere Ekle</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => download(item.analysisId, true)}
                                                        className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Orijinal Belgeyi İndir</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => download(item.analysisId, false)}
                                                        className="p-1 rounded-full text-warning-400 hover:bg-blue-50"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Analiz Raporunu İndir</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => deleteItem(item.analysisId)}
                                                        className="p-1 rounded-full text-red-500 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Sil</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TooltipProvider>
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
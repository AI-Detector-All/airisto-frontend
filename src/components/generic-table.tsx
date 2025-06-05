'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TableAction, TableColumn } from '@/types/table';


interface GenericTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    actions?: TableAction<T>[];
    keyField: keyof T;
    searchable?: boolean;
    defaultItemsPerPage?: number;
    onDataChange?: (data: T[]) => void;
}

// Generic Table Component
export default function GenericTable<T extends Record<string, any>>({
    data,
    columns,
    actions = [],
    keyField,
    searchable = false,
    defaultItemsPerPage = 10,
}: GenericTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
    const [tableData, setTableData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const filteredData = searchable && searchTerm
        ? tableData.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : tableData;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // const updateData = (newData: T[]) => {
    //     setTableData(newData);
    //     onDataChange?.(newData);
    // };

    // const deleteItem = (item: T) => {
    //     const newData = tableData.filter(dataItem => dataItem[keyField] !== item[keyField]);
    //     updateData(newData);
    // };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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
                    className={`px-3 py-1 mx-1 rounded ${currentPage === i
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        : "text-gray-900 bg-transparent hover:bg-gray-300"
                        }`}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    const getCellValue = (item: T, column: TableColumn<T>) => {
        if (typeof column.key === 'string' && column.key.includes('.')) {
            const keys = column.key.split('.');
            let value = item;
            for (const key of keys) {
                value = value?.[key];
            }
            return value;
        }
        return item[column.key as keyof T];
    };

    return (
        <div className="w-full">
            {searchable && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}

            <div className="rounded-xl border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`py-3 px-4 text-${column.align || 'left'} text-sm font-medium text-gray-500`}
                                    style={{ width: column.width }}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">
                                    Eylemler
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={String(item[keyField])} className="border-b hover:bg-gray-50">
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`py-3 px-4 text-sm text-${column.align || 'left'}`}
                                    >
                                        {column.render
                                            ? column.render(item, getCellValue(item, column))
                                            : String(getCellValue(item, column) || '')
                                        }
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="py-3 px-4">
                                        <TooltipProvider>
                                            <div className="flex justify-center space-x-2">
                                                {actions.map((action, actionIndex) => {
                                                    if (action.show && !action.show(item)) return null;

                                                    const Icon = action.icon;
                                                    return (
                                                        <Tooltip key={actionIndex}>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    onClick={() => action.onClick(item)}
                                                                    className={`p-1 rounded-full hover:bg-gray-100 ${action.className || ''}`}
                                                                >
                                                                    <Icon className="w-5 h-5" />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{typeof action.label === 'function' ? action.label(item) : action.label}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </div>
                                        </TooltipProvider>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredData.length > 5 && (
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
                        {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`rounded p-1 ${currentPage === 1
                                ? "text-gray-900 bg-transparent"
                                : "text-gray-900 hover:bg-gray-100"
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
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
import { useTranslate } from '@/locales';

interface GenericTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    actions?: TableAction<T>[];
    keyField: keyof T;
    searchable?: boolean;
    defaultItemsPerPage?: number;
    onDataChange?: (data: T[]) => void;
}

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
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslate('documents');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        const maxButtons = isMobile ? 3 : 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-2 sm:px-3 py-1 mx-0.5 sm:mx-1 rounded text-xs sm:text-sm ${
                        currentPage === i
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

    const visibleColumns = columns.filter(column => 
        !isMobile || !column.hideOnMobile
    );
    
    const visibleActions = actions.filter(action => 
        !isMobile || !action.hideOnMobile
    );

    return (
        <div className="w-full">
            {searchable && (
                <div className="mb-4 p-2">
                    <input
                        type="text"
                        placeholder="Ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}

            <div className="rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                {visibleColumns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`py-2 sm:py-3 px-2 sm:px-4 text-${column.align || 'left'} text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap`}
                                        style={{ 
                                            width: column.width,
                                            minWidth: isMobile ? '80px' : 'auto'
                                        }}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                                {visibleActions.length > 0 && (
                                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        {isMobile ? '' : t('actions')}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={String(item[keyField])} className="border-b hover:bg-gray-50">
                                    {visibleColumns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-${column.align || 'left'} ${
                                                isMobile ? 'max-w-[120px]' : ''
                                            }`}
                                        >
                                            {column.render
                                                ? column.render(item, getCellValue(item, column))
                                                : String(getCellValue(item, column) || '')
                                            }
                                        </td>
                                    ))}
                                    {visibleActions.length > 0 && (
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <TooltipProvider>
                                                <div className={`flex ${isMobile ? 'justify-end' : 'justify-center'} space-x-1 sm:space-x-2`}>
                                                    {visibleActions.map((action, actionIndex) => {
                                                        if (action.show && !action.show(item)) return null;

                                                        const Icon = action.icon;
                                                        return (
                                                            <Tooltip key={actionIndex}>
                                                                <TooltipTrigger asChild>
                                                                    <button
                                                                        onClick={() => action.onClick(item)}
                                                                        className={`p-1 sm:p-1.5 rounded-full hover:bg-gray-100 ${action.className || ''}`}
                                                                    >
                                                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="text-xs">
                                                                        {typeof action.label === 'function' ? action.label(item) : action.label}
                                                                    </p>
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
            </div>

            {filteredData.length > 5 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 sm:gap-0">
                    <div className="flex items-center order-2 sm:order-1">
                        <span className="text-xs sm:text-sm text-gray-700 flex items-center">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="mx-1 sm:mx-2 rounded border-gray-300 p-1 text-xs sm:text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <span className="hidden sm:inline">Her sayfada</span>
                        </span>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-700 order-1 sm:order-2">
                        {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} / {filteredData.length}
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-2 order-3">
                        <Button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`rounded p-1 ${
                                currentPage === 1
                                    ? "text-gray-300 bg-transparent cursor-not-allowed"
                                    : "text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>

                        {renderPaginationButtons()}

                        <Button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`rounded bg-transparent p-1 ${
                                currentPage === totalPages
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
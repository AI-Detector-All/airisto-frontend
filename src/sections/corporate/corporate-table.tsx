'use client';
import GenericTable from "@/components/generic-table";
import { Corporate } from "@/types/corporates";
import { TableAction, TableColumn } from "@/types/table";
import { Eye } from "lucide-react";
import React from "react";

interface CorporateTableProps {
    corporates: Corporate[];
}

export const CorporateTable: React.FC<CorporateTableProps> = ({ corporates }) => {

    const columns: TableColumn<Corporate>[] = [
        {
            key: 'name',
            header: 'Kurum',
            render: (item) => (
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">
                            {item.name.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {item.name}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'domain',
            header: 'Domain',
            render: (item) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {item.domain}
                    </div>
                </div>
            )
        },
        {
            key: 'membersLength',
            header: 'Toplam Kullanıcı',
            render: (item) => {
                return (
                    <div className="text-sm">
                        <div className="font-medium">{item?.members?.length}</div>
                    </div>
                )
            }
        },
        {
            key: 'subscription',
            header: 'Abonelik',
            render: (item) => {
                return (
                    <div className="text-sm">
                        <div className="font-medium">{item.subscription?.name || "-"}</div>
                    </div>
                )
            }
        },
        {
            key: 'remainToken',
            header: 'Kalan Token',
            render: (item) => (
                <div className="text-sm">
                    <div className="font-medium">{item?.subscription?.maxTotalAnalyses ? (item?.subscription?.maxTotalAnalyses - item.totalUsedAnalyses) : "-"}</div>
                </div>
            )
        },
        {
            key: 'isActive',
            header: 'Durum',
            align: 'center',
            render: (item, value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {value ? 'Aktif' : 'Pasif'}
                </span>
            )
        }
    ];

    const actions: TableAction<Corporate>[] = [
        {
            icon: Eye,
            label: 'Görüntüle',
            onClick: (item) => console.log('View user:', item.id),
            className: 'text-blue-600 hover:bg-blue-50'
        },
    ];

    return (
        <GenericTable
            data={corporates}
            columns={columns}
            actions={actions}
            keyField="id"
            searchable={true}
        />
    );
};
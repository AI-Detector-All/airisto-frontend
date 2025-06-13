'use client';
import GenericTable from "@/components/generic-table";
import { useTranslate } from "@/locales";
import { TableAction, TableColumn } from "@/types/table";
import { User } from "@/types/user";
import { Eye, UserCheck, UserX } from "lucide-react";
import React from "react";

interface UsersTableProps {
    users: User[];
}

export const AllUsersTable: React.FC<UsersTableProps> = ({ users }) => {
    const { t } = useTranslate('all-users');
    const columns: TableColumn<User>[] = [
        {
            key: 'name',
            header: t('user'),
            render: (item) => (
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">
                            {item.name.charAt(0)}{item.surname.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {item.name} {item.surname}
                        </div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'type',
            header: t('type'),
            render: (item, value) => (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${value === 'CORPORATE'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                    }`}>
                    {value === 'CORPORATE' ? t('corporate') : t('individual')}
                </span>
            )
        },
        {
            key: 'corporate',
            header: t('corporate'),
            render: (item) => {
                return (
                    <div className="text-sm">
                        <div className="font-medium">{item.corporate?.name || "-"}</div>
                    </div>
                )
            }
        },
        {
            key: 'subscription',
            header: t('subscription'),
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
            header: t('remainToken'),
            render: (item, value) => (
                <div className="text-sm">
                    <div className="font-medium">{value?.toLocaleString()}</div>
                    <div className="text-gray-500">{item.usedAnalysesThisMonth} {t('used')} </div>
                </div>
            )
        },
        {
            key: 'isActive',
            header: t('status'),
            align: 'center',
            render: (item, value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {value ? t('active') : t('inactive')}
                </span>
            )
        }
    ];

    const actions: TableAction<User>[] = [
        {
            icon: Eye,
            label: t('show'),
            onClick: (item) => console.log('View user:', item.id),
            className: 'text-blue-600 hover:bg-blue-50'
        },
        {
            icon: (item) => React.createElement(item.isActive ? UserX : UserCheck),
            label: (item) => item.isEmailVerified ? t('makeInactive') : t('makeActive'),
            onClick: (item) => console.log('Toggle user status:', item.id),
            className: 'text-yellow-600 hover:bg-yellow-50'
        },
    ];

    return (
        <GenericTable
            data={users}
            columns={columns}
            actions={actions}
            keyField="id"
            searchable={true}
        />
    );
};
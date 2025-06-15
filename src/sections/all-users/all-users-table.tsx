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
                <div className="flex items-center min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium text-blue-600">
                            {item.name.charAt(0)}{item.surname.charAt(0)}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {item.name} {item.surname}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                            {item.email}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'type',
            header: t('type'),
            render: (item, value) => (
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${value === 'CORPORATE'
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
            hideOnMobile: true,
            render: (item) => {
                return (
                    <div className="text-xs sm:text-sm min-w-0">
                        <div className="font-medium truncate">
                            {item.corporate?.name || "-"}
                        </div>
                    </div>
                )
            }
        },
        {
            key: 'subscription',
            header: t('subscription'),
            hideOnMobile: true,
            render: (item) => {
                return (
                    <div className="text-xs sm:text-sm min-w-0">
                        <div className="font-medium truncate">
                            {item.subscription?.name || "-"}
                        </div>
                    </div>
                )
            }
        },
        {
            key: 'remainToken',
            header: t('remainToken'),
            render: (item, value) => (
                <div className="text-xs sm:text-sm">
                    <div className="font-medium">
                        {value?.toLocaleString()}
                    </div>
                    <div className="text-gray-500 hidden sm:block">
                        {item.usedAnalysesThisMonth} {t('used')}
                    </div>
                </div>
            )
        },
        {
            key: 'isActive',
            header: t('status'),
            align: 'center',
            render: (item, value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
        <div className="w-full">
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3 p-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                        {/* User Info Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center min-w-0 flex-1">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <span className="text-sm font-medium text-blue-600">
                                        {user.name.charAt(0)}{user.surname.charAt(0)}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                        {user.name} {user.surname}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {user.isEmailVerified ? t('active') : t('inactive')}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <span className="text-gray-500">{t('type')}:</span>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.type === 'CORPORATE'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.type === 'CORPORATE' ? t('corporate') : t('individual')}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500">{t('remainToken')}:</span>
                                <div className="mt-1 font-medium">
                                    {user.remainToken?.toLocaleString()}
                                </div>
                            </div>
                            {user.corporate && (
                                <div className="col-span-2">
                                    <span className="text-gray-500">{t('corporate')}:</span>
                                    <div className="mt-1 font-medium truncate">
                                        {user.corporate.name}
                                    </div>
                                </div>
                            )}
                            {user.subscription && (
                                <div className="col-span-2">
                                    <span className="text-gray-500">{t('subscription')}:</span>
                                    <div className="mt-1 font-medium truncate">
                                        {user.subscription.name}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                            {actions.map((action, actionIndex) => (
                                <button
                                    key={actionIndex}
                                    onClick={() => action.onClick(user)}
                                    className={`p-2 rounded-md transition-colors ${action.className}`}
                                    title={typeof action.label === 'function' ? action.label(user) : action.label}
                                >
                                    {React.createElement(action.icon, { className: "w-4 h-4" })}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden sm:block">
                <GenericTable
                    data={users}
                    columns={columns}
                    actions={actions}
                    keyField="id"
                    searchable={true}
                />
            </div>
        </div>
    );
};
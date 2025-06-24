/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    render?: (item: T, value: any) => React.ReactNode;
    hideOnMobile?: boolean;
}

export interface TableAction<T> {
    icon: React.ComponentType<any>;
    label: string | ((item: T) => string);
    onClick: (item: T) => void;
    className?: string;
    show?: (item: T) => boolean;
    hideOnMobile?: boolean;
    iconClassName?: string;
}
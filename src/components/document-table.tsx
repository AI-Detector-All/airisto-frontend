import { Document } from "@/types/document";
import { TableAction, TableColumn } from "@/types/table";
import { Download, FileText, Star, Trash2 } from "lucide-react";
import GenericTable from "./generic-table";

interface DocumentsTableProps {
    documents: Document[];
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents }) => {
    const getPercentageColor = (percentage: number) => {
        if (percentage < 30) return "text-green-600";
        if (percentage < 70) return "text-yellow-600";
        return "text-red-600";
    };

    const columns: TableColumn<Document>[] = [
        {
            key: 'title',
            header: 'Dosya İsmi',
            render: (item, value) => (
                <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{value || "İsimsiz"}</span>
                </div>
            )
        },
        {
            key: 'type',
            header: 'Tip',
            render: () => (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                    AI Detector
                </span>
            )
        },
        {
            key: 'createdAt',
            header: 'Tarih',
            render: (item, value) => new Date(value).toLocaleDateString('tr-TR')
        },
        {
            key: 'aiPercent',
            header: 'Yüzde',
            render: (item, value) => {
                const percentage = parseInt(value);
                return (
                    <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                                className={`h-2.5 rounded-full ${percentage < 30 ? "bg-green-500" :
                                        percentage < 70 ? "bg-yellow-500" : "bg-red-500"
                                    }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <span className={`text-xs font-medium ${getPercentageColor(percentage)}`}>
                            {percentage}%
                        </span>
                    </div>
                );
            }
        }
    ];

    const actions: TableAction<Document>[] = [
        {
            icon: Star,
            label: 'Favorilere Ekle',
            onClick: (item) => console.log('Favorite:', item.analysisId),
            className: 'text-yellow-500 hover:bg-yellow-50'
        },
        {
            icon: Download,
            label: 'Orijinal Belgeyi İndir',
            onClick: (item) => console.log('Download original:', item.analysisId),
            className: 'text-blue-600 hover:bg-blue-50'
        },
        {
            icon: Download,
            label: 'Analiz Raporunu İndir',
            onClick: (item) => console.log('Download report:', item.analysisId),
            className: 'text-green-600 hover:bg-green-50'
        },
        {
            icon: Trash2,
            label: 'Sil',
            onClick: (item) => console.log('Delete:', item.analysisId),
            className: 'text-red-500 hover:bg-red-50'
        }
    ];

    return (
        <GenericTable
            data={documents}
            columns={columns}
            actions={actions}
            keyField="analysisId"
            searchable={true}
        />
    );
};

import { Document } from "@/types/document";
import { TableAction, TableColumn } from "@/types/table";
import { Download, FileText, Star, Trash2 } from "lucide-react";
import GenericTable from "../../components/generic-table";
import { useTranslate } from "@/locales";

interface DocumentsTableProps {
    documents: Document[];
    handleDeleteAnalysis?: (analysisId: string) => void;
    isSearchButton?: boolean
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ 
    documents, 
    handleDeleteAnalysis, 
    isSearchButton 
}) => {
    const { t } = useTranslate('documents');
    
    const getPercentageColor = (percentage: number) => {
        if (percentage < 30) return "text-green-600";
        if (percentage < 70) return "text-yellow-600";
        return "text-red-600";
    };

    const columns: TableColumn<Document>[] = [
        {
            key: 'title',
            header: t('folderName'),
            width: 'auto',
            render: (item, value) => (
                <div className="flex items-center min-w-0">
                    <FileText className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="font-medium truncate" title={value || "İsimsiz"}>
                        {value || "İsimsiz"}
                    </span>
                </div>
            )
        },
        {
            key: 'type',
            header: t('type'),
            width: '120px',
            hideOnMobile: false,
            render: () => (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2 sm:px-2.5 py-0.5 text-xs font-medium text-purple-800 whitespace-nowrap">
                    AI Detector
                </span>
            )
        },
        {
            key: 'createdAt',
            header: t('date'),
            width: '100px',
            hideOnMobile: true,
            render: (item, value) => (
                <span className="text-xs sm:text-sm whitespace-nowrap">
                    {new Date(value).toLocaleDateString('tr-TR')}
                </span>
            )
        },
        {
            key: 'aiPercent',
            header: t('percentage'),
            width: '140px',
            render: (item, value) => {
                const percentage = parseInt(value);
                return (
                    <div className="flex items-center min-w-0">
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mr-2 min-w-[40px]">
                            <div
                                className={`h-2 sm:h-2.5 rounded-full ${
                                    percentage < 30 ? "bg-green-500" :
                                    percentage < 70 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <span className={`text-xs font-medium flex-shrink-0 ${getPercentageColor(percentage)}`}>
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
            label: t('addFavorite'),
            onClick: (item) => console.log('Favorite:', item.analysisId),
            className: 'text-yellow-500 hover:bg-yellow-50',
            hideOnMobile: true
        },
        {
            icon: Download,
            label: t('downloadOriginalDocument'),
            onClick: (item) => console.log('Download original:', item.analysisId),
            className: 'text-blue-600 hover:bg-blue-50'
        },
        {
            icon: Download,
            label: t('downloadAnalyzedDocument'),
            onClick: (item) => console.log('Download report:', item.analysisId),
            className: 'text-green-600 hover:bg-green-50',
            hideOnMobile: true
        },
        {
            icon: Trash2,
            label: t('delete'),
            onClick: (item) => {
                if (handleDeleteAnalysis) {
                    handleDeleteAnalysis(item.analysisId);
                }
            },
            className: 'text-red-500 hover:bg-red-50'
        }
    ];

    return (
        <div className="w-full">
            <GenericTable
                data={documents}
                columns={columns}
                actions={actions}
                keyField="analysisId"
                searchable={isSearchButton}
            />
        </div>
    );
};
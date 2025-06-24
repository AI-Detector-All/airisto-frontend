import { Document } from "@/types/document";
import { TableAction, TableColumn } from "@/types/table";
import { Download, FileText, Star, Trash2 } from "lucide-react";
import GenericTable from "../../components/generic-table";
import { useTranslate } from "@/locales";
import { deleteAnalysis, downloadInputDocument, downloadOutputDocument } from "@/services/analysis";
import { downloadBlob } from "@/utils/download-blob";
import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserDocument } from "@/hooks/useUserDocument";
import { toast } from "sonner";

interface DocumentsTableProps {
    documents: Document[];
    isSearchButton?: boolean
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({
    documents,
    isSearchButton
}) => {
    const { t } = useTranslate('documents');
    const { refreshUserData } = useAuth()
    const { refreshUserAnalysis } = useUserDocument();
    const [loading, setLoading] = useState<{
        input: string | null;
        output: string | null;
        delete: string | null;
    }>({
        input: null,
        output: null,
        delete: null
    });

    const getPercentageColor = (percentage: number) => {
        if (percentage < 30) return "text-green-600";
        if (percentage < 70) return "text-yellow-600";
        return "text-red-600";
    };

    const handleDeleteAnalysis = async (analysisId: string) => {
        setLoading(prev => ({ ...prev, delete: analysisId }));
        try {
            await deleteAnalysis(analysisId);
            refreshUserAnalysis();
            refreshUserData();
            toast.success(t('deleteSuccess'), { description: t('deleteSuccessDesc') });
        } catch (error) {
            console.error(error);
            toast.error(t('errorTitle'), {
                description: t('deleteFailDesc')
            });
        } finally {
            setLoading(prev => ({ ...prev, delete: null }));
        }
    }

    const downloadAnalyzedDocument = async (analysis: Document) => {
        setLoading(prev => ({ ...prev, output: analysis.analysisId }));
        try {
            const response = await downloadOutputDocument(analysis.analysisId);

            if (!response || response.size === 0) {
                throw new Error(t('downloadErrorTitle'));
            }

            const filename = `analyzed-${analysis.title}-${analysis.analysisId}.pdf`;
            downloadBlob(response, filename);


        } catch (error) {
            console.error(error);
            toast.error(t('downloadErrorTitle'), {
                description: t('downloadErrorDesc')
            });
        } finally {
            setLoading(prev => ({ ...prev, output: null }));
        }
    };

    const downloadOriginalDocument = async (analysis: Document) => {
        setLoading(prev => ({ ...prev, input: analysis.analysisId }));
        try {
            const response = await downloadInputDocument(analysis.analysisId);

            if (!response || response.size === 0) {
                throw new Error(t('downloadErrorTitle'));
            }

            const filename = `original-${analysis.title}-${analysis.analysisId}.pdf`;
            downloadBlob(response, filename);


        } catch (error) {
            console.error(error);
            toast.error(t('downloadErrorTitle'), {
                description: t('downloadErrorDesc')
            });
        } finally {
            setLoading(prev => ({ ...prev, input: null }));
        }
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
                                className={`h-2 sm:h-2.5 rounded-full ${percentage < 30 ? "bg-green-500" :
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

    const actions = useMemo<TableAction<Document>[]>(() => [
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
            onClick: (item) => {
                if (loading.input !== item.analysisId) {
                    downloadOriginalDocument(item);
                }
            },
            className: `text-blue-600 hover:bg-blue-50`,
        },
        {
            icon: Download,
            label: t('downloadAnalyzedDocument'),
            onClick: (item) => {
                if (loading.output !== item.analysisId) {
                    downloadAnalyzedDocument(item);
                }
            },
            className: `text-green-600 hover:bg-green-50`,
            hideOnMobile: true,
        },
        {
            icon: Trash2,
            label: t('delete'),
            onClick: (item) => {
                if (loading.delete !== item.analysisId) {
                    handleDeleteAnalysis(item.analysisId);
                }
            },
            className: `text-red-500 hover:bg-red-50`,
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [loading, t]);

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
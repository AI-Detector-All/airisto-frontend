export const downloadBlob = (blob: Blob, filename: string): boolean => {
    try {
        if (!blob || blob.size === 0) {
            throw new Error('Geçersiz dosya');
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('Download blob error:', error);
        return false;
    }
};
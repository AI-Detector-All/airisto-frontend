export const formatDate = (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...options,
    };

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('tr-TR', defaultOptions).format(dateObj);
};

export const timeAgo = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const intervals = {
        yıl: seconds / 31536000,
        ay: seconds / 2592000,
        gün: seconds / 86400,
        saat: seconds / 3600,
        dakika: seconds / 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        if (value > 1) {
            return `${Math.floor(value)} ${unit} önce`;
        }
    }

    return 'Az önce';
};
export function extractFilenameFromHeader(contentDisposition: string): string | null {
    if (!contentDisposition) return null;

    const match = contentDisposition.match(/filename="([^"]+)"/);
    return match ? match[1] : null;
}
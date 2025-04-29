export function formatNumber(num: number): string {
    if (num < 0) return '--';
    return num.toString().padStart(2, '0');
};
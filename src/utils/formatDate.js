export function formatDate(date) {
    const originalDate = new Date(date);
    const formattedDate = originalDate.toISOString().split("T")[0];
    return formattedDate;
}

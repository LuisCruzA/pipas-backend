export const parseDateHourInitials = (inputDate: string): Date => {
    const date = new Date(inputDate);
    date.setUTCHours(0, 0, 0, 0);
    return date;
};



export const parseDateRange = (range: { from: string, to: string }): { from: Date, to: Date } => {
    const fromDate = parseDateHourInitials(range.from);
    const toDate = parseDateHourInitials(range.to);
    toDate.setUTCHours(23, 59, 59, 999);
    return { from: fromDate, to: toDate };
};
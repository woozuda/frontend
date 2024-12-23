import { ReportLibs } from "@/app/lib/report";

export function getEightWeeks(start: Date, end: Date, weeks: number = 8): {start: string, end: string, date: Date, week: number }[] {
    let startDate = new Date(start);
    let endDate = new Date(end);
    const result: {start: string, end: string, date: Date, week: number}[] = [];

    for (let i = 0; i < weeks; i++) {
        startDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const [date, week] = ReportLibs.getWeekNumber(startDate, endDate);

        result.push({
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
            date,
            week
        });
    }

    return result;
}
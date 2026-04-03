export class DateUtils {
   
    static getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    
    static getPastDate(daysAgo: number): string {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    }
}
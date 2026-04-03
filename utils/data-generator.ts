export class DataGenerator {
    static generateRandomEmail(): string {
        const randomString = Math.random().toString(36).substring(7);
        return `admin_${randomString}@geoclean.com`;
    }
}
import { request, APIRequestContext } from '@playwright/test';

export class ApiUtils {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createCleanerViaApi(token: string, cleanerData: any) {
        const response = await this.request.post('/api/cleaners', {
            data: cleanerData,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
}
export interface QueryOptions {
    page?: number;
    limit?: number;
    skip?: number;
    select?: string[];
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
    category?: string;
}
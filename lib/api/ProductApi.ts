import { Category } from "@/model/Category";
import { Product, ProductsResponse } from "@/model/Product";
import { QueryOptions } from "@/model/QueryOptions";

export class ProductApi {

    private static async fetcher<T>(endpoint: string): Promise<T> {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        console.log('url: ' + endpoint);
        if (!res.ok) {
            throw new Error(`Failed to fetch from DummyJSON: ${res.statusText}`);
        }
        return res.json();
    }

    private static buildParams(options: QueryOptions): string {
        const params = new URLSearchParams();
        const limit = options.limit ?? 8;

        // Calculate `skip` from `page` if provided, otherwise use `skip` directly
        const skip = options.page !== undefined ? (options.page - 1) * limit : options.skip;

        params.append('limit', limit.toString());
        if (skip !== undefined) params.append('skip', skip.toString());
        if (options.select?.length) params.append('select', options.select.join(','));
        if (options.sortBy) params.append('sortBy', options.sortBy);
        if (options.order) params.append('order', options.order);

        const queryString = params.toString();
        return queryString ? `?${queryString}` : '';
    }

    static async getProducts(options: QueryOptions = {}): Promise<ProductsResponse> {
        let endpoint = '';

        if (options.search) {
            endpoint = `/search?q=${encodeURIComponent(options.search)}`;
            const params = this.buildParams(options);
            endpoint += params ? `&${params.slice(1)}` : '';
        } else if (options.category) {
            endpoint = `/category/${encodeURIComponent(options.category)}${this.buildParams(options)}`;
        } else {
            endpoint = this.buildParams(options);
        }

        return this.fetcher<ProductsResponse>(endpoint);
    }

    static async getProductById(id: number | string, select?: string[]): Promise<Product> {
        const params = select?.length ? `?select=${select.join(',')}` : '';
        return this.fetcher<Product>(`/${id}${params}`);
    }

    static async getCategories(): Promise<Category[]> {
        return this.fetcher<Category[]>('/categories');
    }
}

const BASE_URL = 'https://dummyjson.com/products';
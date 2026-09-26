import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Product, ProductsResponse } from '@/model/Product';
import { ProductApi } from './ProductApi';
import { Category } from '@/model/Category';
import { QueryOptions } from '@/model/QueryOptions';

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (options: QueryOptions) => [...productKeys.lists(), options] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number | string) => [...productKeys.details(), id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
};

export class ProductQueries {
    static useProducts(
        options: QueryOptions = {},
        queryOptions?: Omit<UseQueryOptions<ProductsResponse, Error>, 'queryKey' | 'queryFn'>
    ): UseQueryResult<ProductsResponse, Error> {
        return useQuery({
            queryKey: productKeys.list(options),
            queryFn: () => ProductApi.getProducts(options),
            ...queryOptions,
        });
    }

    static useProduct(
        id: number | string,
        selectFields?: string[],
        queryOptions?: Omit<UseQueryOptions<Product, Error>, 'queryKey' | 'queryFn'>
    ): UseQueryResult<Product, Error> {
        return useQuery({
            queryKey: productKeys.detail(id),
            queryFn: () => ProductApi.getProductById(id, selectFields),
            enabled: !!id,
            staleTime: 3 * 1000 * 60,
            ...queryOptions,
        });
    }

    static useCategories(
        queryOptions?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
    ): UseQueryResult<Category[], Error> {
        return useQuery({
            queryKey: productKeys.categories(),
            queryFn: () => ProductApi.getCategories(),
            staleTime: 1000 * 60 * 60,
            ...queryOptions,
        });
    }
}
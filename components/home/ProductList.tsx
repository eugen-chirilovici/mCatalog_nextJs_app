"use client"

import ProductSheet from "./ProductSheet";
import { QueryOptions } from "@/model/QueryOptions";
import { SORT_BY_MAP, SortOption, SortOrder } from "@/lib/option/SortByMap";
import { useState } from "react";
import { ProductQueries } from "@/lib/api/ProductQueries";

interface ProductListProps {
    userPreferences?: QueryOptions;
}

export default function ProductList({ userPreferences }: ProductListProps) {
    const [page, setPage] = useState(userPreferences?.page ?? 1);
    const [limit, setLimit] = useState(userPreferences?.limit ?? 8);
    const [search, setSearch] = useState(userPreferences?.search ?? '');
    const [category, setCategory] = useState(userPreferences?.category ?? '');
    const [sortBy, setSortBy] = useState(userPreferences?.sortBy ?? SORT_BY_MAP[0].sortBy);
    const [order, setOrder] = useState<SortOrder>(userPreferences?.order ?? SORT_BY_MAP[0].order);
    const [sortOption, setSortOption] = useState<SortOption>(SORT_BY_MAP[0]);
    const [showClearFilters, setShowClearFilters] = useState<boolean>(false);

    const categories = ProductQueries.useCategories();

    const products = ProductQueries.useProducts({
        page,
        limit,
        sortBy,
        order,
        search,
        category
    });

    const totalPages = products.data ? Math.ceil(products.data?.total / limit) : 0;

    const handleSearchChange = (word: string) => {
        setSearch(word);
        setSortOption(SORT_BY_MAP[0]);
        setSortBy(SORT_BY_MAP[0].sortBy);
        setOrder(SORT_BY_MAP[0].order);
        setCategory('');
        setPage(1);
        setShowClearFilters(false);
    };

    const handleCategoryChange = (category: string) => {
        setCategory(category);
        setPage(1);
        setShowClearFilters(true);
    };

    const handleSortByChange = (selectedLabel: string) => {
        SORT_BY_MAP.filter((item) => item.label === selectedLabel)
            .map((option) => {
                setSortOption(option);
                setSortBy(option.sortBy);
                setOrder(option.order);
                setPage(1);
                setShowClearFilters(true);
            })
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSortOption(SORT_BY_MAP[0]);
        setSortBy(SORT_BY_MAP[0].sortBy);
        setOrder(SORT_BY_MAP[0].order);
        setCategory('');
        setPage(1);
        setShowClearFilters(false);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border text-black">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="p-2 border rounded w-full sm:w-64" />

                {/* Sort & Limit controls */}
                <div className="flex items-center gap-3">

                    {showClearFilters && (
                        <button
                            onClick={() => handleClearFilters()}
                            className="px-3 py-2 bg-white border rounded text-sm font-medium hover:bg-gray-100">

                            Clear filters
                        </button>
                    )}

                    <select
                        value={sortOption.label}
                        onChange={(e) => handleSortByChange(e.target.value)}
                        className="p-2 border rounded text-sm bg-white">

                        {SORT_BY_MAP.map((sortOption) =>
                            <option key={sortOption.label} value={sortOption.label}>{sortOption.label}</option>
                        )}
                    </select>

                    <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="p-2 border rounded text-sm bg-white">

                        <option value=''>All categories</option>

                        {!categories.isLoading && (
                            categories.data?.map((category) => (
                                <option key={category.slug} value={category.name}>{category.name}</option>
                            )))
                        };
                    </select>

                    <select
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="p-2 border rounded text-sm bg-white">

                        <option value={8}>8 per page</option>
                        <option value={16}>16 per page</option>
                        <option value={24}>24 per page</option>
                    </select>
                </div>
            </div>

            {/* Loading Indicator for Background Refetches */}
            {products.isFetching && !products.isLoading && (
                <p className="text-xs text-blue-600 font-semibold animate-pulse">
                    Updating results...
                </p>
            )}

            {products.isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {products.data?.products.map((product) => (
                        <ProductSheet key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination Bar */}
            {products.data && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t text-black">
                    <span className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{products.data?.skip + 1}</span> to{' '}
                        <span className="font-semibold">{Math.min(products.data?.skip + products.data?.limit, products.data?.total)}</span> of{' '}
                        <span className="font-semibold">{products.data?.total}</span> products
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 text-sm border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        <span className="text-sm px-2 text-white">
                            Page <span className="font-medium">{page}</span> of{' '}
                            <span className="font-medium">{totalPages}</span>
                        </span>

                        <button
                            onClick={() => {
                                if (page < totalPages) {
                                    setPage((prev) => prev + 1);
                                }
                            }}
                            disabled={page >= totalPages}
                            className="px-3 py-1.5 text-sm border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
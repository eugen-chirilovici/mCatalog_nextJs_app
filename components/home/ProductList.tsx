"use client";

import ProductSheet from "./ProductSheet";
import { QueryOptions } from "@/model/QueryOptions";
import { SORT_BY_MAP, SortOrder } from "@/lib/option/SortByMap";
import { useEffect, useState } from "react";
import { ProductQueries } from "@/lib/api/ProductQueries";
import { useSearchContext } from "@/context/SearchContext";
import { SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ProductListProps {
    userPreferences?: QueryOptions;
}

export default function ProductList({ userPreferences }: ProductListProps) {
    const [page, setPage] = useState(userPreferences?.page ?? 1);
    const [limit, setLimit] = useState(userPreferences?.limit ?? 8);
    const [category, setCategory] = useState(userPreferences?.category ?? "");
    const [sortBy, setSortBy] = useState(userPreferences?.sortBy ?? SORT_BY_MAP[0].sortBy);
    const [order, setOrder] = useState<SortOrder>(userPreferences?.order ?? SORT_BY_MAP[0].order);
    const [showClearFilters, setShowClearFilters] = useState<boolean>(false);
    const { search, sortOption, setSortOption } = useSearchContext();

    const categories = ProductQueries.useCategories();

    const products = ProductQueries.useProducts({
        page,
        limit,
        sortBy,
        order,
        search,
        category,
    });

    const totalPages = products.data ? Math.ceil(products.data?.total / limit) : 0;

    useEffect(() => {
        setSortBy(SORT_BY_MAP[0].sortBy);
        setOrder(SORT_BY_MAP[0].order);
        setCategory("");
        setPage(1);
        setShowClearFilters(false);
    }, [search]);

    const handleCategoryChange = (category: string) => {
        setCategory(category);
        setPage(1);
        setShowClearFilters(true);
    };

    const handleSortByChange = (selectedLabel: string) => {
        SORT_BY_MAP.filter((item) => item.label === selectedLabel).forEach((option) => {
            setSortOption(option);
            setSortBy(option.sortBy);
            setOrder(option.order);
            setPage(1);
            setShowClearFilters(true);
        });
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSortOption(SORT_BY_MAP[0]);
        setSortBy(SORT_BY_MAP[0].sortBy);
        setOrder(SORT_BY_MAP[0].order);
        setCategory("");
        setPage(1);
        setShowClearFilters(false);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
            {/* Controls Bar */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    {/* Left: Filter Controls Group */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mr-1">
                            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                            <span>Filters</span>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortOption.label}
                            onChange={(e) => handleSortByChange(e.target.value)}
                            className="h-10 px-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all cursor-pointer"
                        >
                            {SORT_BY_MAP.map((sortOption) => (
                                <option key={sortOption.label} value={sortOption.label}>
                                    Sort by: {sortOption.label}
                                </option>
                            ))}
                        </select>

                        {/* Category Dropdown */}
                        <select
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="h-10 px-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {!categories.isLoading &&
                                categories.data?.map((cat) => (
                                    <option key={cat.slug} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>

                        {/* Clear Filters Button */}
                        {showClearFilters && (
                            <button
                                onClick={handleClearFilters}
                                className="inline-flex items-center gap-1.5 h-10 px-3.5 bg-rose-50 border border-rose-200/60 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-100/80 transition-all cursor-pointer active:scale-95"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Right: Background Refetch Indicator */}
                    {products.isFetching && !products.isLoading && (
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 animate-pulse self-end md:self-center">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-900" />
                            Updating catalog...
                        </div>
                    )}
                </div>
            </div>

            {/* Product Grid / Skeleton State */}
            {products.isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {Array.from({ length: limit }).map((_, idx) => (
                        <div
                            key={idx}
                            className="h-[380px] bg-slate-100/80 animate-pulse rounded-2xl border border-slate-200/60"
                        />
                    ))}
                </div>
            ) : products.data?.products.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-base font-medium text-slate-900">No products found</p>
                    <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {products.data?.products.map((product) => (
                        <ProductSheet key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination Bar */}
            {products.data && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 text-slate-700">

                    {/* Result Counts */}
                    <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        Showing <span className="font-semibold text-slate-900">{products.data?.skip + 1}</span> to{" "}
                        <span className="font-semibold text-slate-900">
                            {Math.min(products.data?.skip + products.data?.limit, products.data?.total)}
                        </span>{" "}
                        of <span className="font-semibold text-slate-900">{products.data?.total}</span> products
                    </span>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">

                        {/* Limit Selector */}
                        <select
                            value={limit}
                            onChange={(e) => handleLimitChange(Number(e.target.value))}
                            className="h-9 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none transition-all cursor-pointer"
                        >
                            <option value={8}>8 per page</option>
                            <option value={16}>16 per page</option>
                            <option value={24}>24 per page</option>
                        </select>

                        {/* Prev Page Button */}
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="inline-flex items-center justify-center h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                        >
                            <ChevronLeft className="h-4 w-4 mr-0.5" />
                            Prev
                        </button>

                        {/* Page Counter Badge */}
                        <span className="text-xs font-medium px-3 py-2 bg-slate-100 rounded-xl text-slate-900">
                            {page} / {totalPages}
                        </span>

                        {/* Next Page Button */}
                        <button
                            onClick={() => {
                                if (page < totalPages) {
                                    setPage((prev) => prev + 1);
                                }
                            }}
                            disabled={page >= totalPages}
                            className="inline-flex items-center justify-center h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
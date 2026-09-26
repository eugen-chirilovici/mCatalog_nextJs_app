export type SortOrder = 'asc' | 'desc';

export interface SortOption {
    label: string,
    sortBy: string,
    order: SortOrder
}

export const SORT_BY_MAP: SortOption[] = [
    { label: "Price: Low to High", sortBy: "price", order: "asc" },
    { label: "Price: High to Low", sortBy: "price", order: "desc" },
    { label: "Rating: Low to High", sortBy: "rating", order: "asc" },
    { label: "Rating: High to Low", sortBy: "rating", order: "desc" }
];
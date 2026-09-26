"use client";

import { SORT_BY_MAP, SortOption } from "@/lib/option/SortByMap";
import { createContext, useContext, useState } from "react";

interface SearchContextType {
    search: string;
    sortOption: SortOption;
    setSearchWrapper: (value: string) => void;
    setSortOption: (value: SortOption) => void;
}

const SeachContext = createContext<SearchContextType | undefined>(undefined);

export const SeachContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState(SORT_BY_MAP[0]);

    const setSearchWrapper = (value: string) => {
        setSearch(value);
        setSortOption(SORT_BY_MAP[0]);
    }

    return (
        <SeachContext.Provider
            value={{ search, sortOption, setSearchWrapper, setSortOption }}>
            {children}
        </SeachContext.Provider>
    );
}

export const useSearchContext = () => {
    const context = useContext(SeachContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SeachContextProvider");
    }
    return context;
};

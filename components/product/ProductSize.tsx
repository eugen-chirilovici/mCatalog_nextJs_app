"use client";

import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useProductItems } from "@/context/ProductContext";

export default function ProductSize({ productType }: { productType: string }) {
    const { updateSelectedSize } = useProductItems();
    const [selectedSize, setSelectedSize] = useState<string>("");

    const handleSizeChange = (size: string | null) => {
        if (size !== null) {
            setSelectedSize(size);
            updateSelectedSize(size);
        }
    };

    return (
        <FieldGroup className="w-full">
            <FieldSet className="w-full">
                <Field className="flex flex-col gap-2 w-full">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Select Size
                    </FieldLabel>
                    <Select value={selectedSize} onValueChange={handleSizeChange}>
                        <SelectTrigger
                            id="product-size-select"
                            className="w-full h-11 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all cursor-pointer"
                        >
                            <SelectValue placeholder="Choose a size..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200/80 shadow-xl rounded-2xl p-1.5 min-w-[180px]">
                            <SelectGroup>
                                {adjustSizeBasedOnProductType(productType).map((item) => (
                                    <SelectItem
                                        key={item.value || "default"}
                                        value={item.value}
                                        className="rounded-lg text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 cursor-pointer px-3 py-2 transition-colors"
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </FieldSet>
        </FieldGroup>
    );
}

export interface SizeOption {
    label: string;
    value: string;
}

const adjustSizeBasedOnProductType = (productType: string): SizeOption[] => {
    switch ((productType || "").toUpperCase()) {
        case "TSHIRT":
        case "HOODIES":
        case "TROUSERS":
            return [...defaultSizeMap, ...tShortSizeMap];

        case "FOOTWEAR":
        case "SOCKS":
            return [...defaultSizeMap, ...shoesSizeMap];

        default:
            return defaultSizeMap;
    }
};

const defaultSizeMap: SizeOption[] = [
    { label: "Select size...", value: "" }
];

const tShortSizeMap: SizeOption[] = [
    { label: "2XS", value: "2XS" },
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
    { label: "3XL", value: "3XL" }
];

const shoesSizeMap: SizeOption[] = [
    { label: "EU 35", value: "35" },
    { label: "EU 36", value: "36" },
    { label: "EU 37", value: "37" },
    { label: "EU 38", value: "38" },
    { label: "EU 39", value: "39" },
    { label: "EU 40", value: "40" },
    { label: "EU 41", value: "41" },
    { label: "EU 42", value: "42" },
    { label: "EU 43", value: "43" },
    { label: "EU 44", value: "44" },
    { label: "EU 45", value: "45" },
    { label: "EU 46", value: "46" }
];
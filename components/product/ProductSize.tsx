import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useProductItems } from "@/context/ProductContext";

export default function ProductSize({ productType }: { productType: String }) {
    const { updateSelectedSize } = useProductItems();
    const [selectedSize, setSelectedSize] = useState<String>("");

    const handleSizeChange = (size: String | null) => {
        if (size !== null) {
            setSelectedSize(size);
            updateSelectedSize(size.valueOf())
        }
    };

    return (
        <FieldGroup>
            <FieldSet>
                <Field className="w-4xs flex flex-row">
                    <FieldLabel className="text-base">
                        Select the size:
                    </FieldLabel>
                    <Select value={selectedSize} onValueChange={handleSizeChange}>
                        <SelectTrigger id="checkout-7j9-exp-year-f59">
                            <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {adjustSizeBasedOnProductType(productType).map((item) => (
                                    <SelectItem key={item.value} value={item.value} >
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

// type ProductType = "FOOTWEAR" | "TSHIRT" | "TROUSERS" | "SOCKS" | "HOODIES";

const adjustSizeBasedOnProductType = (productType: String): SizeOption[] => {
    switch (productType.toUpperCase()) {
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
}

const defaultSizeMap: SizeOption[] = [
    { label: "Size", value: "" }
]

const tShortSizeMap: SizeOption[] = [
    { label: "2XS", value: "2XS" },
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
    { label: "3XL", value: "3XL" }
]

const shoesSizeMap: SizeOption[] = [
    { label: "35", value: "35" },
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
    { label: "45", value: "45" },
    { label: "46", value: "46" },
]
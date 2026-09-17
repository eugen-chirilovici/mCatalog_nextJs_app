"use client"

import { useProductItems } from "@/context/ProductContext";
import BasketItems from "@/components/basket/BasketItems";
import { FieldGroup, FieldLegend } from "@/components/ui/field";

export default function Basket() {

    const { productsDTO } = useProductItems();

    if (productsDTO.length === 0) {
        return (
            <h2>The Basket is empty</h2>
        )
    }

    return (
        <div className="flex flex-row mt-10 mx-50">
            <BasketItems productsDTO={productsDTO} />
            <div>
                <FieldGroup>
                    <FieldLegend>Price: $N</FieldLegend>
                </FieldGroup>
            </div>
        </div>
    );
}
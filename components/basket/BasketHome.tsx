"use client"

import { useProductItems } from "@/context/ProductContext";
import { ShoppingCart } from "lucide-react";

export default function BasketHome() {
    const { productsDTO } = useProductItems();

    return (
        <div className="flex flex-row">
            <ShoppingCart name="Card Icon" className="h-12 w-12 cursor-pointer" />
            {
                (productsDTO.length !== 0) ?
                    <div className="text-4xl ml-2 mt-3">
                        {productsDTO.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                    : <></>
            }
        </div>
    );
}
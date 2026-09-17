"use client"

import { useProductItems } from "@/context/ProductContext";
import BasketItems from "@/components/basket/BasketItems";
import BasketEmpty from "@/components/basket/BasketEmpty";
import CheckoutBasket from "@/components/checkout/CheckoutBasket";

export default function Basket() {
    const { productsDTO } = useProductItems();

    if (productsDTO.length === 0) {
        return (
            <BasketEmpty/>
        )
    }

    return (
        <div className="flex flex-row justify-around mt-10">
            <BasketItems productsDTO={productsDTO} />
            <CheckoutBasket/>
        </div>
    );
}
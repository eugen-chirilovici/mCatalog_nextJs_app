"use client"

import { useProductItems } from "@/context/ProductContext";
import BasketItems from "@/components/basket/BasketItems";
import BasketEmpty from "@/components/basket/BasketEmpty";
import CheckoutBasket from "@/components/checkout/CheckoutBasket";

export default function Basket() {
    const { productsDTO } = useProductItems();

    if (productsDTO.length === 0) {
        return (
            <BasketEmpty />
        )
    }

    if (productsDTO.some((product) => product.quantity === 5)) {
        /*
        todo: not working as expected, try to solve.
       
        Reason:        
        React Error Boundaries ( error.tsx or global-error.tsx) only catch errors 
        thrown during rendering, lifecycle methods, and constructors. 
        
        They do not catch errors thrown inside:
        *   Asynchronous event handlers (eg, onClick={() => throw new Error()})
        *   Asynchronous callbacks (eg, setTimeout, fetch().then())
        *   Server Actions / API routes directly on the client side
        */
        throw new Error('Generated error!');
    }

    return (
        <div className="flex flex-row justify-around mt-10">
            <BasketItems productsDTO={productsDTO} />
            <CheckoutBasket />
        </div>
    );
}
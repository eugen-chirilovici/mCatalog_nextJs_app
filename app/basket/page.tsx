"use client"

import { useProductItems } from "@/context/ProductContext";
import BasketItems from "@/components/basket/BasketItems";
import BasketEmpty from "@/components/basket/BasketEmpty";
import CheckoutBasket from "@/components/checkout/CheckoutBasket";

export default function Basket() {
    const { productsDTO } = useProductItems();

    if (productsDTO.length === 0) {
        return <BasketEmpty />;
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-8 sm:mb-10">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                    <BasketItems productsDTO={productsDTO} />
                </div>

                <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
                    <CheckoutBasket />
                </div>
            </div>
        </section>
    );
}
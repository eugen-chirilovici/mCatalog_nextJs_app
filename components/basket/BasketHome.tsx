"use client"

import { useProductItems } from "@/context/ProductContext";
import { ShoppingCart } from "lucide-react";

export default function BasketHome() {
    const { productsDTO } = useProductItems();
    const itemCount = productsDTO.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative inline-flex items-center justify-center p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-200 cursor-pointer group">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-105" />

            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-150">
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
        </div>
    );
}
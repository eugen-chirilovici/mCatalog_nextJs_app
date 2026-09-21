"use client"

import { useProductItems } from "@/context/ProductContext";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CheckoutBasket() {
    const { productsDTO } = useProductItems();

    const subtotal = productsDTO.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
    const total = subtotal + shipping;

    return (
        <div className="w-full">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Order Summary
                </h2>

                <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                        <span>Estimated Shipping</span>
                        <span className="font-semibold text-slate-900">
                            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span className="text-slate-400 text-xs my-auto">Calculated at checkout</span>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-base font-bold text-slate-900">
                        <span>Total</span>
                        <span className="text-xl">${total.toFixed(2)}</span>
                    </div>
                </div>

                <Link href="/checkout" className="block w-full">
                    <Button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]">
                        Proceed to Checkout
                    </Button>
                </Link>

                <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                    🔒 Encrypted & Secure Checkout
                </p>
            </div>
        </div>
    );
}
"use client"

import Image from "next/image";
import { ProductDTO } from "@/model/ProductDTO";
import { Button } from "../ui/button";
import { useProductItems } from "@/context/ProductContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BasketItems({ productsDTO }: { productsDTO: ProductDTO[] }) {
    const { removeFromBasket } = useProductItems();

    return (
        <ScrollArea className={`${adjustScrollHigh(productsDTO)} w-full rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm`}>
            <div className="flex flex-col gap-4">
                {productsDTO.map((product) => (
                    <div
                        key={product.uuid}
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                        <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 bg-slate-100 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                            <Image
                                loading="eager"
                                src={product.image}
                                alt={product.name}
                                width={128}
                                height={128}
                                className="object-contain h-full w-full"
                            />
                        </div>

                        <div className="flex flex-col justify-between flex-grow w-full gap-3">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-base sm:text-lg line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                                    Qty: <strong className="text-slate-900 font-semibold">{product.quantity}</strong>
                                </span>
                                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                                    Size: <strong className="text-slate-900 font-semibold">{product.size}</strong>
                                </span>
                            </div>

                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 p-0 h-auto hover:bg-transparent transition-colors"
                                    onClick={() => removeFromBasket(product.uuid)}
                                >
                                    Remove item
                                </Button>
                                <span className="text-xs font-semibold text-slate-900">
                                    Total: ${(product.price * product.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}

const adjustScrollHigh = (productsDTO: ProductDTO[]): string => {
    return productsDTO.length === 1
        ? "h-[220px]"
        : productsDTO.length === 2
            ? "h-[420px]"
            : "h-[580px]";
};
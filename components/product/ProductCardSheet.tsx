"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/model/Product";
import Image from "next/image";
import { useProductItems } from "@/context/ProductContext";
import ProductSize from "./ProductSize";
import { showToast } from "@/lib/utils";
import { FieldLabel } from "../ui/field";

export default function ProductCardSheet({ product }: { product: Product }) {
    const { converProductToProductDTO, addToProductItems } = useProductItems();

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">

                <div className="relative aspect-square w-full bg-slate-100/80 rounded-2xl p-6 sm:p-8 flex items-center justify-center overflow-hidden border border-slate-200/60">
                    <Image
                        loading="eager"
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="flex flex-col justify-between h-full gap-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                {product.name}
                            </h2>
                            <p className="text-2xl font-bold text-slate-900 mt-2">
                                ${product.price}
                            </p>
                        </div>

                        <div className="pt-2">
                            <ProductSize productType={product.type} />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                            <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                                Description
                            </FieldLabel>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <Button
                            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm sm:text-base rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                            onClick={() => {
                                addToProductItems(converProductToProductDTO(product));
                                showToast("Product was added", "Thank you");
                            }}>
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
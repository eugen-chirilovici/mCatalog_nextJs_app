"use client";

import ProductCardSheet from "@/components/product/ProductCardSheet";
import products from "@/data/products.json";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Product({
    params
}: {
    params: Promise<{ productId: String }>
}) {
    const router = useRouter();
    const resolvedParams = use(params);

    const productById = products.find((product) => product.id.toString() === resolvedParams.productId);
    if (!productById) {
        return (
            <h1>Product not Found</h1>
        )
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    return (
        <div onClick={() => router.back()}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">

            <div onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
                    aria-label="Close modal">
                    ✕
                </button>

                <ProductCardSheet product={productById} />
            </div>
        </div>
    );
}
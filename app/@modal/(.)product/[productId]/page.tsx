"use client";

import ProductCardSheet from "@/components/product/ProductCardSheet";
import products from "@/data/products.json";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Product({
    params
}: {
    params: Promise<{ productId: string }>
}) {
    const router = useRouter();
    const resolvedParams = use(params);

    const productById = products.find((product) => product.id.toString() === resolvedParams.productId);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    if (!productById) {
        return (
            <div
                onClick={() => router.back()}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200/80 text-center relative"
                >
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
                    <p className="text-sm text-slate-500 mb-6">The item you are looking for does not exist or has been removed.</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => router.back()}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200/80 animate-in zoom-in-95 duration-200 my-auto"
            >
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 text-sm font-semibold transition-all active:scale-95 shadow-sm"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <ProductCardSheet product={productById} />
            </div>
        </div>
    );
}
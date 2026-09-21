import ProductCardSheet from "@/components/product/ProductCardSheet";
import products from "@/data/products.json";
import Link from "next/link";

export default async function Product({ params }:
    {
        params: Promise<{ productId: string }>
    }
) {
    const { productId } = await params;

    const productById = products.find((product) => product.id.toString() === productId);
    if (!productById) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center flex-grow flex flex-col items-center justify-center">
                <div className="bg-white rounded-3xl p-10 border border-slate-200/80 shadow-sm max-w-md w-full">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
                    <p className="text-sm text-slate-500 mb-6">
                        The item you are looking for does not exist or has been removed.
                    </p>
                    <Link
                        href="/"
                        className="inline-block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
                    >
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
                <ProductCardSheet product={productById} />
            </div>
        </section>
    );
}
import PRODUCTS from "@/data/products.json";
import ProductSheet from "./ProductSheet";

export default function ProductList() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {PRODUCTS.map((product) => (
                    <ProductSheet key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
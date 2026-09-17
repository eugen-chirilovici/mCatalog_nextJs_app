import products from "@/data/products.json";
import ProductSheet from "./ProductSheet";

export default function ProductList() {
    return (
        <div className="flex flex-wrap justify-center">
            {
                products.map((product) => (
                    <ProductSheet key={product.id} product={product} />
                ))
            }
        </div>
    );
}
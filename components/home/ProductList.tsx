import products from "@/data/products.json";
import ProductSheet from "./ProductSheet";

export default function ProductList() {
    return (
        <div className="flex flex-wrap pt-10">
            {
                products.map((product) => (
                    <ProductSheet key={product.id} product={product} />
                ))
            }
        </div>
    );
}
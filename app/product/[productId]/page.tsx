import ProductCardSheet from "@/components/product/ProductCardSheet";
import products from "@/data/products.json";

export default async function Product({ params }:
    {
        params: Promise<{ productId: String }>
    }
) {
    const { productId } = await params;

    const productById = products.find((product) => product.id.toString() === productId);
    if (!productById) {
        return (
            <h1>Product not Found</h1>
        )
    }

    return (
        <ProductCardSheet product={productById} />
    );
}
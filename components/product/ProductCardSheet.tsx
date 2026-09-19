"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/model/Product";
import Image from "next/image";
import { useProductItems } from "@/context/ProductContext";
import ProductSize from "./ProductSize";
import { showToast } from "@/lib/utils";

export default function ProductCardSheet({ product }: { product: Product }) {
    const { converProductToProductDTO, addToProductItems } = useProductItems();

    return (
        <div className="flex flex-row justify-center mt-10">
            <Card className="w-100">
                <Image loading="eager" src={product.image} alt={product.name} width={500} height={500} />
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductSize productType={product.type} />
                </CardContent>
                <CardFooter className="flex justify-center bg-white">
                    <Button className="w-50" onClick={() => {
                        addToProductItems(converProductToProductDTO(product));
                        showToast("Product was added", "Thank you");
                    }}>Add to cart</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
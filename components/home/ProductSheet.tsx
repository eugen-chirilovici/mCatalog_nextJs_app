import { Product } from "@/model/Product";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card, CardDescription, CardHeader } from "../ui/card";
import Link from "next/link";

export default function ProductSheet({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`}>
            <Card className="w-2xs mx-6 my-8">
                <CardHeader className="flex flex-row">{product.name}</CardHeader>
                <Image src={product.image} alt={product.name} width={400} height={400} />
                
                <CardDescription>{product.description}</CardDescription>
            </Card>
        </Link>
    );
}
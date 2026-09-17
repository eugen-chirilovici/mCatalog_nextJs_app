import { Product } from "@/model/Product";
import Image from "next/image";
import { Card, CardDescription, CardHeader } from "../ui/card";
import Link from "next/link";
import { Label } from "../ui/label";

export default function ProductSheet({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`}>
            <Card className="w-2xs mx-6 my-8">
                <CardHeader>{product.name}</CardHeader>
                <Image loading="eager" src={product.image} alt={product.name} width={400} height={400} />
                <Label className="pl-4">Price: ${product.price}</Label>
                <CardDescription className="pl-4 text-black">{product.description}</CardDescription>
            </Card>
        </Link>
    );
}
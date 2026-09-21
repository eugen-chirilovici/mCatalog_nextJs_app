"use client"

import Image from "next/image";
import { ProductDTO } from "@/model/ProductDTO";
import { Field, FieldGroup, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Button } from "../ui/button";
import { useProductItems } from "@/context/ProductContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BasketItems({ productsDTO }: { productsDTO: ProductDTO[] }) {
    const { removeFromBasket } = useProductItems();

    return (
        <ScrollArea className={`${adjustScrollHigh(productsDTO)} w-2xl rounded-md border-2`}>
            <div className="flex flex-col justify-center items-center p-5 gap-2">
                {productsDTO.map((product) => (
                    <div key={product.uuid} className="flex flex-row w-xl pl-2 border-2 rounded-2xl " >
                        <Image loading="eager" src={product.image} alt={product.name} width={250} height={250} className="p-3" />
                        <FieldGroup className="mx-2 my-2 pl-5" >
                            <Field>
                                {product.name}
                            </Field>
                            <FieldSeparator className="w-3xs" />
                            <FieldSet>
                                <Field>Price: ${product.price}</Field>
                                <Field>Quantity: {product.quantity}</Field>
                                <Field>Size: {product.size}</Field>
                            </FieldSet>
                            <Button className="w-3xs" onClick={() => removeFromBasket(product.uuid)}>Remove item</Button>
                        </FieldGroup>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

const adjustScrollHigh = (productsDTO: ProductDTO[]): String => {
    return productsDTO.length === 1 ?
        "h-[300px]" : (
            productsDTO.length === 2 ?
                "h-[560px]" :
                "h-[650px]"
        );
}
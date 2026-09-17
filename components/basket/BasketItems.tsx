"use client"

import Image from "next/image";
import { ProductDTO } from "@/model/ProductDTO";
import { Field, FieldGroup, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Button } from "../ui/button";
import { useProductItems } from "@/context/ProductContext";

export default function BasketItems({ productsDTO }: { productsDTO: ProductDTO[] }) {
    const { removeFromBasket } = useProductItems();

    return (
        <div className="flex flex-col w-2xl">
            {productsDTO.map((product) => (
                <div key={product.uuid} className="flex flex-row w-xl pl-2 border-2" >
                    <Image src={product.image} alt={product.name} width={250} height={250} />
                    <FieldGroup className="mx-2 my-2 pl-5" >
                        <Field>
                            {product.name}
                        </Field>
                        <FieldSeparator />
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
    )
}
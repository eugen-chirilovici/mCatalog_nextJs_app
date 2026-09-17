import { FieldGroup, Field } from "@/components/ui/field";
import { useProductItems } from "@/context/ProductContext";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CheckoutBasket() {
    const { productsDTO } = useProductItems();

    return (
        <div className="flex flex-col w-2xs mx-10">
            <div className="border-2 p-5 rounded-2xl">
                <FieldGroup className="flex flex-col items-center">
                    <Field>Price: ${productsDTO.reduce((sum, item) => sum + item.price, 0)}</Field>
                    <Link href="/checkout">
                        <Button className={`w-3xs`}>Buy</Button>
                    </Link>
                </FieldGroup>
            </div>
        </div>
    )
}
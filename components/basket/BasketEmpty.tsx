import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import EMPTY_BASKET from "@/public/images/emptry-basket.png";

export default function BasketEmpty() {
    return (
        <div className="flex justify-center mt-20">
            <div className="flex flex-col items-center justify-center border-2 rounded-2xl w-xs">
                <Image loading="eager" src={EMPTY_BASKET} alt={"Empty Bucket"} width={250} height={250} />
                <p className="text-2xl mx-4 mb-3.5">Nothing here... Do you want to go shopping?</p>
                <Link className="w-3xs mb-2" href="/">
                    <Button className="w-3xs">Yes!</Button>
                </Link>
            </div>
        </div>
    )
}
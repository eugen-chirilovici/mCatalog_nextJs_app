import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import EMPTY_BASKET from "@/public/images/emptry-basket.png";

export default function BasketEmpty() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-sm">
                <div className="relative w-48 h-48 mb-6 flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                    <Image
                        loading="eager"
                        src={EMPTY_BASKET}
                        alt="Empty Basket"
                        width={200}
                        height={200}
                        className="object-contain h-full w-full opacity-90"
                    />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2">
                    Your cart is empty
                </h2>
                <p className="text-sm text-slate-500 mb-8 max-w-xs leading-relaxed">
                    Looks like you haven't added anything to your cart yet. Discover our latest collection and start shopping!
                </p>

                <Link href="/" className="w-full">
                    <Button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]">
                        Explore Products
                    </Button>
                </Link>
            </div>
        </section>
    );
}
import { Product } from "@/model/Product";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";

export default function ProductSheet({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <Card className="h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div>
          <div className="relative aspect-square w-full overflow-hidden bg-slate-100 p-6 flex items-center justify-center">
            <Image
              loading="eager"
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-5 flex flex-col gap-1.5">
            <h3 className="font-semibold text-base text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        <div className="px-5 pb-5 pt-1 flex items-center justify-between border-t border-slate-100 mt-auto">
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
            View Details &rarr;
          </span>
        </div>
      </Card>
    </Link>
  );
}
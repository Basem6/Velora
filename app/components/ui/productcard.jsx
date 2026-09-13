
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product, displayCategory, priority = false }) {
return (
    <Link
    href={`/products/${displayCategory.toLowerCase()}/${product.id}`}
    className="group block min-w-0"
    >
    <div className="relative mb-4 aspect-3/4 overflow-hidden bg-stone-100">
        <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition duration-700 group-hover:scale-105"
        style={{ objectPosition: product.position }}
        />

        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-black opacity-0 transition group-hover:opacity-100">
        <ArrowUpRight size={16} strokeWidth={1.5} />
        </span>
    </div>

    <div className="flex items-start justify-between gap-3 text-sm">
        <div className="min-w-0">
        <h2 className="truncate font-medium">{product.name}</h2>
        <p className="mt-1 text-xs text-stone-500">
            {product.category}
        </p>
        </div>

        <p className="shrink-0">${product.price}</p>
    </div>
    </Link>
);
}
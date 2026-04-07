import Image from 'next/image';

//export interface Product {
//    category: string;
//    id: number;
//    title: string;
//    image: string;
//    price: number;
//}
export interface Product {
    category: string;
    id: number;
    title: string;
    thumbnail: string; // changed
    price: number;
}
{/*export default function ProductCard({ title, image, price }: Product) {
    return (
        <div className="w-64 border border-black/10 dark:border-white/10 rounded xl-4 dark:bg-gray-800 p-4 hover:shadow transition">
            <Image
                src={image}
                alt={title}
                width={100}
                height={40}
                className="object-contain mb-3 rounded"
            />
            <h2 className="text-sm text-black dark:text-white font-medium mb-1">
                {title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                ${price.toFixed(2)}
            </p>
        </div>
    );
}*/}
export default function ProductCard({ title, thumbnail, price }: Product) {
    return (
        <div className="w-64 border border-black/10 dark:border-white/10 rounded xl-4 dark:bg-gray-800 p-4 hover:shadow transition">
            <Image
                src={thumbnail}
                alt={title}
                width={100}
                height={40}
                className="object-contain mb-3 rounded"
            />
            <h2 className="text-sm text-black dark:text-white font-medium mb-1">
                {title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                ${price.toFixed(2)}
            </p>
        </div>
    );
}
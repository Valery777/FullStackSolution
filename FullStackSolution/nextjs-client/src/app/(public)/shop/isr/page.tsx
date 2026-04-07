import ProductCard, { type Product } from "@/app/components/ProductCard"
import { API_URL } from "@/app/constants"

{/*export default async function ShopISRPage() {

    const response = await fetch(API_URL, {
        next: { revalidate: 300 }
    });
    const products = (await response.json()) as Product[]
    const filtered = products.filter(
        p => p.category === "electronics" 
    );

    console.log("isr products:\n", JSON.stringify(products, null, 2));
    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-purple-600 text-transparent bg-clip-text mb-6">
                Electronics
            </h1>
            <div className='grid grid-cols-4 gap-2'>
              
                {filtered.map(product => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </div>
    )
}
*/}

export default async function ShopISRPage() {

    const response = await fetch(API_URL, {
        next: { revalidate: 300 }
    });
    const data = await response.json()

    // DummyJSON returns { products: [...] }
    const products = data.products as Product[]

    //const filtered = products.filter(
    //    p => p.category === "groceries"
    //)
    const filtered = products.filter(
        p => p.category === "groceries"
    )
    console.log("isr products:\n", JSON.stringify(products, null, 2))

    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text mb-6">
                {/*Clothing*/}
                Groceries
            </h1>

            <div className='grid grid-cols-4 gap-2'>
                {filtered.map(product => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </div>
    )
}
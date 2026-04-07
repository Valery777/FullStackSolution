
import ProductCard, { type Product } from "../../components/ProductCard"
import { API_URL } from "@/app/constants"

{/*export default async function Shop() {
    
    const response = await fetch(API_URL, {cache:'no-store'})
    const products = (await response.json()) as Product[]
    const filtered = products.filter(
        p => p.category === "women's clothing" || p.category === "men's clothing"
    )
    console.log("ssr products:\n", JSON.stringify(products, null, 2));
    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text mb-6">
                Clothing
            </h1>
        <div className='grid grid-cols-4 gap-2'>
            
            {filtered.map(product => (
                <ProductCard
                    key={product.id}

            ))}
            </div>
        </div>
    )
}
*/}


export default async function Shop() {

    const response = await fetch(API_URL, { cache: 'no-store' })
    const data = await response.json()

    // DummyJSON returns { products: [...] }
    const products = data.products as Product[]

    const filtered = products.filter(
        p => p.category === "fragrances" || p.category === "beauty"
    )

    console.log("ssr products:\n", JSON.stringify(products, null, 2))

    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text mb-6">
                {/* Clothing*/}
                Beauty & Fragrances
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

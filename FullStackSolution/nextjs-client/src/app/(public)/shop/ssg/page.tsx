
import ProductCard, { type Product } from "@/app/components/ProductCard"
import { API_URL } from "@/app/constants"

{/*export default async function ShopSSGPage() {
   
    const response = await fetch(API_URL)
    const products = (await response.json()) as Product[]
    const filtered = products.filter(
        p => p.category === "jewelery" 
    )
    console.log("ssg products:\n", JSON.stringify(products, null, 2));
    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
                Jewelery
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
}*/}

export default async function ShopSSGPage() {

    const response = await fetch(API_URL)
    const data = await response.json()

    // Extract the array
    const products = data.products as Product[]

    const filtered = products.filter(
        p => p.category === "furniture"
    )

    return (
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text mb-6">
                {/*Clothing*/}
                Furniture
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
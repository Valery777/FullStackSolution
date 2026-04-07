import { useEffect, useState } from 'react';

interface Product {
    Id: number;
    Name: string;
    Price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:5001/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Products List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.Id}>{product.Name} - ${product.Price}</li>
                ))}
            </ul>
        </div>
    );
}
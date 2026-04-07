// app/actions/products.ts
"use server";

export async function getProducts() {
    // Simulate DB call
    await new Promise(r => setTimeout(r, 500));

    return [
        { id: 1, name: "Dell", price: 1200 },
        { id: 2, name: "Apple", price: 800 },
        { id: 3, name: "HP", price: 600 }
    ];
}
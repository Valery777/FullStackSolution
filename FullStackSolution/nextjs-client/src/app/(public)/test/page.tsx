/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import {
    Drawer, TextField, Button, Table, TableBody, TableCell, TableContainer, Pagination,
    TableHead, TableRow, Paper, Box
} from "@mui/material";
import { API_URL_WEBAPI, API_URL_WEBAPI_ARTCODE, STATUS_SUCCESS, ROWS_PER_PAGE } from "@/app/constants";
import { Toaster, toast } from 'react-hot-toast';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
export default function TestPage() {

    interface Product {
        id: number;
        name: string;
        category: string;
        price: number;
        type: string;
        quantity: number;
        description: string;
        createDate: Date;
        updateDate: Date;

    }


    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [statusIsModify, setStatusIsModify] = useState<boolean>(true);
    const [form, setForm] = useState<Product>({
        id: 0,
        name: "",
        category: "",
        type: "",
        price: 0,
        quantity: 0,
        description: "",
        createDate: new Date(),
        updateDate: new Date()
    });

    // Search + Sorting + Pagination
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [sortField, setSortField] = useState<keyof Product>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const rowsPerPage = ROWS_PER_PAGE;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("API_URL_WEBAPI", API_URL_WEBAPI);
                let response = await fetch(API_URL_WEBAPI);
                console.log("fetch response:\n", response.status);
                if (response.status !== STATUS_SUCCESS) {
                    setStatusIsModify(false);
                    response = await fetch(API_URL_WEBAPI_ARTCODE);

                }
                const data = await response.json();

                setProducts(data);
            } catch (err) {
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    // Validation
    const validate = () => {
        const e: any = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.category.trim()) e.category = "Category is required";
        if (form.price <= 0) e.price = "Price must be greater than 0";
        if (form.quantity < 0) e.quantity = "Quantity cannot be negative";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // Sorting
    const toggleSort = (field: keyof Product) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        const A = a[sortField];
        const B = b[sortField];
        if (A < B) return sortOrder === "asc" ? -1 : 1;
        if (A > B) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const paginated = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleAdd = () => {
        setIsEdit(false);
        setForm({
            id: 0,
            name: "",
            category: "",
            type: "",
            price: 0,
            quantity: 0,
            description: "",
            createDate: new Date(),
            updateDate: new Date()
        });
        setOpen(true);
    };

    const handleEdit = (product: Product) => {
        setIsEdit(true);
        setForm(product);
        setOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this product?")) return;

        await fetch(API_URL_WEBAPI + { id }, {
            method: "DELETE"
        });

        setProducts(products.filter(p => p.id !== id));
    };

    const handleSave = async () => {
        if (statusIsModify) {
            if (!validate()) return;

            if (isEdit) {
                await fetch(API_URL_WEBAPI + form.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                // Update UI immediately
                setProducts(prev =>
                    prev.map(p => (p.id === form.id ? { ...form } : p))
                );

                toast.success("Product updated");
            }
            else {
                const res = await fetch(API_URL_WEBAPI, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                const newProduct = await res.json();
                setProducts([...products, newProduct]);
                toast.success("Product added");
            }

            setOpen(false);
        }
        else {
            alert("there is not connection to the database");
        }
    };

    if (loading) return <p>Loading...</p>;
    return (

        <>
            <Toaster position="top-right" />
            <Box sx={{ maxWidth: 1200, margin: "20px auto" }}>
                <TextField
                    label="Search"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={e => setSearch(e.target.value)}
                />
            <button
                onClick={handleAdd}
                style={{
                    margin: "20px",
                    padding: "10px 20px",
                    background: "#1976d2",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                + Add Product
            </button>
        <TableContainer component={Paper} sx={{
            maxWidth: 1200,
            margin: "30px auto",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}>

            <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                {["id", "name", "category", "type", "price", "quantity", "description","createDate", "updateDate"].map(col => (
                                    <TableCell
                                        key={col}
                                        sx={{ color: "white", fontWeight: "bold", cursor: "pointer" }}
                                        onClick={() => toggleSort(col as keyof Product)}
                                    >
                                        {col.toUpperCase()} {sortField === col ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                <TableBody>
                     {paginated.map(p => (
                        <TableRow key={p.id}>

                            <TableCell>{p.id}</TableCell>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>{p.type}</TableCell>
                            <TableCell>${p.price}</TableCell>
                            <TableCell>{p.quantity}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell>
                                {new Date(p.createDate).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                })}
                            </TableCell>
                            <TableCell>
                                {new Date(p.updateDate).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                })}
                            </TableCell>
                            <TableCell>
                                 <Tooltip title="Edit">
                                     <IconButton
                                         onClick={() => handleEdit(p)}
                                         
                                         sx={{ color: "#1976d2" }}
                                     >
                                         <EditIcon />
                                     </IconButton>
                                 </Tooltip>

                                 <Tooltip title="Delete">
                                     <IconButton
                                         onClick={() => handleDelete(p.id)}
                                         disabled={!statusIsModify}
                                         sx={{ color: "red" }}
                                     >
                                         <DeleteIcon />
                                     </IconButton>
                                 </Tooltip>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <div style={{ width: 350, padding: 20 }}>
                    <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    <TextField
                        label="Category"
                        fullWidth
                        margin="normal"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                    />

                    <TextField
                        label="Type"
                        fullWidth
                        margin="normal"
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                    />

                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    />

                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={form.quantity}
                        onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSave}
                    >
                        {isEdit ? "Update" : "Insert"}
                    </Button>
                </div>
                </Drawer>
                <Pagination
                    count={Math.ceil(sorted.length / rowsPerPage)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                />
            </Box>
        </>

    );
}


{/*import type { Metadata } from 'next';

//type Params = { tag?: string };
type Params = { username: string };

const title = 'Test Server Search Params';
export async function generateMetadata({params}:
    { params: Promise<Params> }):
    Promise<Metadata> {

    return {
        title: '@1' + (await params).username,
    }
}
    export default async function TestPage({
    //searchParams,
    params
}: {
        // searchParams: Promise<Params>;
        params: Promise<Params>;

}) {
    //const { tag } = await searchParams;
    const { username } = await params;
    return (
        <div>
            <p>Test Server Search Params</p>
            <h1 className="text-3xl font-bold mb-6">
                {/*Explore  {!!tag && `by #${tag}`}
                Explore  {!!username && `by #${username} ${title}`}
            </h1>
        </div>
    );
}*/}







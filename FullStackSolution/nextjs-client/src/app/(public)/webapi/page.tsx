/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
        Modal, Box, TextField, Pagination, IconButton} from '@mui/material';
 import { Toaster, toast } from 'react-hot-toast';
import CloseIcon from "@mui/icons-material/Close";
import { API_URL_WEBAPI, API_URL_WEBAPI_ARTCODE, STATUS_SUCCESS, ROWS_PER_PAGE } from "@/app/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import { IconButton, Tooltip } from "@mui/material";
export default function WebApi() {

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
    const [loading, setLoading] = useState(true);
    const [statusIsModify, setStatusIsModify] = useState<boolean>(true);
    // Modal + Form
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const [form, setForm] = useState<Product>({
        id: 0,
        name: "",
        category: "",
        price: 0,
        type: "",
        quantity: 0,
        description: "",
        createDate: new Date(),
        updateDate: new Date()
    });

    // Search + Sorting + Pagination
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Product>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const rowsPerPage = ROWS_PER_PAGE;

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("API_URL_WEBAPI", API_URL_WEBAPI);
                let response = await fetch(API_URL_WEBAPI);
                console.log("fetch response:\n", response.status);
                if (response.status !== STATUS_SUCCESS)
                {
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

    // CRUD Handlers
    const handleAdd = () => {
        setIsEdit(false);
        setForm({
            id: 0,
            name: "",
            category: "",
            price: 0,
            type: "",
            quantity: 0,
            description: "",
            createDate: new Date(),
            updateDate: new Date()
        });
        setOpen(true);
    };

    const handleEdit = (p: Product) => {
        setIsEdit(true);
        setForm(p);
        setOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this product")) return;

        await fetch(API_URL_WEBAPI + {id}, {
            method: "DELETE"
        });

        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted");
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

                <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }} >
                    + Add Product
                </Button>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                {["id", "name", "category", "type", "price", "quantity","description","updateDate"].map(col => (
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
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEdit(p)}
                                            //disabled={!statusIsModify}
                                            sx={{
                                                borderRadius: "20px",
                                                textTransform: "none",
                                                mr: 1,
                                                color: "#1976d2",
                                                borderColor: "#1976d2"
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(p.id)}
                                            disabled={!statusIsModify}
                                            sx={{
                                                borderRadius: "20px",
                                                textTransform: "none",
                                                color: "red",
                                                borderColor: "red"
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={Math.ceil(sorted.length / rowsPerPage)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                />
            </Box>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        //position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        position: "relative"
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "#555"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                  
                    {/* Your form fields here */}
                   <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

                    {["name", "category", "type", "description"].map(field => (
                        <TextField
                            key={field}
                            label={field.toUpperCase()}
                            fullWidth
                            margin="normal"
                            error={!!errors[field]}
                            helperText={errors[field]}
                            value={(form as any)[field]}
                            onChange={e => setForm({ ...form, [field]: e.target.value })}
                        />
                    ))}

                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                        value={form.price}
                        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    />

                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        value={form.quantity}
                        onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
                    />

                    <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
                        {isEdit ? "Update" : "Insert"}
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
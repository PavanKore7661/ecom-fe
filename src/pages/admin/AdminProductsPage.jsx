import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllProducts } from "../../services/productService";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {Select,MenuItem, InputLabel, FormControl} from "@mui/material";
import { getAllCategories } from "../../services/categoryService";
import {createProduct, updateProduct, uploadProductImage} from "../../services/productService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AdminProductsPage() {

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message,setMessage] = useState("");
    const [alertType,setAlertType] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: ""
    });

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch(error) {
            console.error(error);
        }
    };

const loadCategories = async () => {
    const response = await getAllCategories();
    setCategories(response.data);
};
const handleSave = async () => {
    try {
        if(editingProductId){
            await updateProduct(editingProductId,productForm);
            setMessage("Product updated successfully");
        }else{
            await createProduct(productForm);
            setMessage("Product created successfully");
        }
        setOpen(false);
        setAlertType("success");
        setOpenSnackbar(true);
        loadProducts();
    }catch(error){
        console.error(error);
        setMessage(error.response?.data || "Something went wrong");
        setAlertType("error")
        setOpenSnackbar(true);
        console.error(error);
    }
};
const handleEdit = (product) => {
    setEditingProductId(product.id);
    setProductForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        categoryId: product.category.id
    });
    setOpen(true);
};

const handleDelete = async () => {
    try{
        await deleteProduct(selectedProduct.id);
        setDeleteOpen(false);
        loadProducts();
        setMessage("Product deleted successfully");
        setAlertType("success");
        setOpenSnackbar(true);
    }catch(error){
        console.error(error);
    }
};

const handleImageUpload = (product) => {
    setSelectedProductId(product.id);
    setSelectedImage(null);
    setImageDialogOpen(true);
};
const closeDialog = () => {
    setOpen(false);
    setEditingProductId(null);
    setProductForm({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: ""
    });
};

const handleChange = (e) => {
    setProductForm({
        ...productForm,
        [e.target.name]: e.target.value
    });
};

const confirmDelete = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
};

const uploadImage = async () => {
    try{
        await uploadProductImage(selectedProductId, selectedImage);
        setImageDialogOpen(false);
        loadProducts();
        setMessage("Image uploaded successfully");
        setAlertType("success");
        setOpenSnackbar(true);
    }catch(error){
        console.error(error);
    }
};

const columns = [
    {
        field: "id",
        headerName: "Product ID",
        flex: 0.5
    },
    {
        field: "name",
        headerName: "Product Name",
        flex: 2
    },
    {
        field: "category",
        headerName: "Category",
        flex: 1.5,
        valueGetter: (value, row) =>
            row.category?.name || "-"
    },
    {
        field: "price",
        headerName: "Price",
        flex: 0.8,
        renderCell: (params) => (
            <>₹{params.row.price}</>
        )
    },
    {
        field: "stockQuantity",
        headerName: "Stock",
        flex: 0.8
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 1.7,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                        handleEdit(params.row)
                    }
                >
                    Edit
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleImageUpload(params.row)}
                >
                 Image
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => confirmDelete(params.row)}
                >
                    Delete
                </Button>
            </>
        )
    }
];

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Product Management
            </h1>
            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => setOpen(true)}
            >
                Add Product
            </Button>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 2
                    }}
                />
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    {editingProductId ? "Edit Product" : "Add Product"}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="Product Name"
                        name="name"
                        value={productForm.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={productForm.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={productForm.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Stock"
                        name="stockQuantity"
                        type="number"
                        value={productForm.stockQuantity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal"
                    >
                        <InputLabel>
                            Category
                        </InputLabel>

                        <Select
                            name="categoryId"
                            value={productForm.categoryId}
                            onChange={handleChange}
                        >
                            {
                                categories.map(category => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                </DialogContent>

                <DialogActions>

                    <Button onClick={closeDialog}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        {editingProductId ? "Update" : "Save"}
                    </Button>

                </DialogActions>
            </Dialog>
            <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => setOpenSnackbar(false)}
                    >
                        <Alert severity={alertType} >
                           {message}
                        </Alert>
            </Snackbar>

            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} >
                <DialogTitle>
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete
                    <strong>{" "}{selectedProduct?.name} </strong> ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} >
                <DialogTitle>
                    Upload Product Image
                </DialogTitle>
                <DialogContent>
                    <input  type="file" accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setImageDialogOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={uploadImage}
                    >
                        Upload
                    </Button>

                </DialogActions>

            </Dialog>
        </AdminLayout>

        );
    }

export default AdminProductsPage;
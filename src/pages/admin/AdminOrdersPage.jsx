import AdminLayout
from "../../components/admin/AdminLayout";
import {getAllOrders} from "../../services/orderService";
import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
function AdminOrdersPage() {

const [orders, setOrders] = useState([]);
useEffect(() => {
    loadOrders();
}, []);

const loadOrders = async () => {
    try {
        const data = await getAllOrders();
        setOrders(data);
        console.log('ordrs----',data);
    } catch (error) {
        console.error(error);
    }
};

const columns = [

{
    field: "id",
    headerName: "Order ID",
    width: 110
},

{
    field: "customer",
    headerName: "Customer",
    width: 180,

    valueGetter: (_, row) =>
        row.customerName
},

{
    field: "totalAmount",
    headerName: "Total",
    width: 120,

    renderCell: (params) => (
        <>₹ {params.value}</>
    )
},

{
    field: "items",
    headerName: "Items",
    width: 100,

    valueGetter: (_, row) =>
        row.itemCount
},

{
    field: "status",
    headerName: "Status",
    width: 160,

    renderCell: (params) => (
        <Chip
            label={params.value}
            color={getStatusColor(params.value)}
        />
    )
},

{
    field: "createdAt",
    headerName: "Date",
    width: 180,

    valueFormatter: (value) =>
        new Date(value).toLocaleString()
},

{
    field: "actions",
    headerName: "Actions",
    width: 120,

    sortable: false,

    renderCell: (params) => (

        <Button
            variant="contained"
            size="small"
            onClick={() => handleView(params.row)}
        >
            View
        </Button>

    )
}

];

const getStatusColor = (status) => {

    switch(status){

        case "CREATED":
            return "warning";

        case "PAID":
            return "info";

        case "SHIPPED":
            return "primary";

        case "DELIVERED":
            return "success";

        case "FAILED":
            return "error";

        default:
            return "default";
    }

};
    return (

        <AdminLayout>

            <DataGrid

                rows={orders}

                columns={columns}

                pageSizeOptions={[5,10,20]}

                disableRowSelectionOnClick

            />

        </AdminLayout>
    );
}

export default AdminOrdersPage;
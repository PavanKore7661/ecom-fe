import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
function AdminLayout({ children }) {

    return (

        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-4">

                <h2 className="text-2xl font-bold mb-6">
                    Admin Panel
                </h2>

                <div className="flex flex-col gap-4">

                    <Link to="/">
                    <HomeIcon />
                     <span> Home</span>
                    </Link>
                    <Link to="/admin/dashboard">
                       <DashboardIcon/>  Dashboard
                    </Link>

                    <Link to="/admin/products">
                       <Inventory2Icon/>  Products
                    </Link>

                    <Link to="/admin/orders">
                        <ShoppingCartIcon/> Orders
                    </Link>



                </div>

            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">

                {children}

            </div>

        </div>
    );
}

export default AdminLayout;
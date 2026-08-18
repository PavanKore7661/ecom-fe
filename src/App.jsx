import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProductDetailsPage from "./pages/public/ProductDetailsPage.jsx";
import CartPage from "./pages/user/CartPage.jsx";
import OrdersPage from "./pages/user/OrdersPage.jsx";
import OrderDetailsPage from "./pages/user/OrderDetailsPage.jsx";
import ProtectedRoute from "./route/ProtectedRoute.jsx";
import AdminRoute from "./route/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProductsPage from "./pages/admin/AdminProductsPage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
            path="/admin/dashboard"
            element={
                <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            }
        />
        <Route
                  path="/admin/products"
                  element={
                      <AdminRoute>
                          <AdminProductsPage />
                      </AdminRoute>
                  }
              />
              <Route
                  path="/admin/orders"
                  element={
                      <AdminRoute>
                          <AdminOrdersPage />
                      </AdminRoute>
                  }
              />
              <Route
                  path="/admin/orders"
                  element={
                      <ProtectedRoute role="ADMIN">
                          <AdminOrdersPage />
                      </ProtectedRoute>
                  }
              />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

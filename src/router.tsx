import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/auth/login.page";
import MainLayout from "./layout/MainLayout";
import AuthGuardComponent from "./guards/AuthGuardComponent";
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import CategoryListPage from "./pages/category/CategoryListPage";
import CollectionListPage from "./pages/collection/CollectionListPage";
import VendorListPage from "./pages/vendor/vendorListPage";

const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage/>
    },
    {
        path: "",
        element: <AuthGuardComponent children={<MainLayout/>} /> ,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />
            },
            {
                path: "/products",
                children: [
                    {
                        path: "", 
                        element: <ProductListPage />
                    },
                    {
                        path: "add", 
                        element: <AddProductPage /> 
                    }
                ]
            },
            {
                path: "/categories",
                element:<CategoryListPage/>
            },
            {
                path: "/collections",
                element:<CollectionListPage/>
            },
            {
                path: "/vendors",
                element:<VendorListPage/>
            }

        ]

    }
])

export default router;
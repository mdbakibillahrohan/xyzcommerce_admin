import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/auth/login.page";
import MainLayout from "./layout/MainLayout";
import AuthGuardComponent from "./guards/AuthGuardComponent";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";


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
                element: <ProductPage/>
            }
        ]

    }
])

export default router;
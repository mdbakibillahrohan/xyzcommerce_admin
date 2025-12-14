import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/auth/login.page";
import MainLayout from "./layout/MainLayout";
import AuthGuardComponent from "./guards/AuthGuardComponent";


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
                element: <h2>Dashboard</h2>
            }
        ]

    }
])

export default router;
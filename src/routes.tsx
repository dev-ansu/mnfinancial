import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Index";
import Layout from "./pages/Layout";
import Container from "./components/Container";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";

export const routes = createBrowserRouter([
    {
        path:"/login",
        element: <Login />
    },
    {
        path:"/app",
        element: <Layout />,
        children:[
            {
                index:true,
                element:<Home />
            },
            {
                path:"categorias",
                element: <Categorias />
            }
        ]
    },
    {
        path:"*",
        element:
        <Container className="flex justify-center items-center text-white font-bold text-7xl">
            <h1>404 - Página não encontrada</h1>
        </Container>

    }
])
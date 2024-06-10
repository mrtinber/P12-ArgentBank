import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SignIn } from "../pages/SignIn";
import { UserProfile } from "../pages/UserProfile";

const Layout =() => {
    return <>
        <Navbar />
            <Outlet />
        <Footer />
    </>
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout />
        ),
        errorElement: <p>Oups, ça marche pas</p>,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'index.html',
                element: <HomePage />
            }, 
            {
                path: 'sign-in.html',
                element: <SignIn />
            }, 
            {
                path: 'profile',
                element: <UserProfile />
            }
        ]
    }
])

export function Router() {
    return <RouterProvider router={router} />
}
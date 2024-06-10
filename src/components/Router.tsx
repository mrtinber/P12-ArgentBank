import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SignIn } from "../pages/SignIn";
import { User } from "../pages/User";

const Layout =() => {
    return <>
        <Navbar />
        {/* <div className="container"> */}
            <Outlet />
        {/* </div> */}
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
                path: 'signin',
                element: <SignIn />
            }, 
            {
                path: 'user',
                element: <User />
            }
        ]
    }
])

export function Router() {
    return <RouterProvider router={router} />
}
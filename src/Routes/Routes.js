import { createBrowserRouter } from "react-router-dom";
import AuthenticatioPage from "../Layouts/AuthenticatioPage";
import Main from "../Layouts/Main";
import LogIn from "../Pages/Authentication/LogIn";
import Signup from "../Pages/Authentication/Signup";
import CategoryPage from "../Pages/CategoryPage";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/Home/HomePage";

const router= createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/categories',
                element:<CategoryPage/>
            },
        ]
    },
    {
        path: '/user',
        element: <AuthenticatioPage/>,
        children:[
            {
                path:'/user/signup',
                element:<Signup/>
            },
            {
                path:'/user/login',
                element:<LogIn/>
            },
        ]
    }
]);


export default router
import { createBrowserRouter } from "react-router-dom";
import AuthenticatioPage from "../Layouts/AuthenticatioPage";
import DashLayOut from "../Layouts/DashLayOut";
import Main from "../Layouts/Main";
import AllCars from "../Pages/AllCars";
import LogIn from "../Pages/Authentication/LogIn";
import Signup from "../Pages/Authentication/Signup";
import CategoryPage from "../Pages/CategoryPage";
import CreatePost from "../Pages/Dashboard/CreatePost";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import PrivateRoutes from "./PrivateRoute";

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
            {
                path:'/cars/:category',
                element:<PrivateRoutes><AllCars/></PrivateRoutes>,
                loader:({params})=> fetch(`http://localhost:5000/cars/${params.category}`),
            },
        ]
    },
    {
        path: '/user',
        element: <AuthenticatioPage/>,
        errorElement:<ErrorPage/>,
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
    },
    {
        path:'/dash',
        element:<DashLayOut/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:'/dash/addproduct',
                element:<CreatePost/>
            }
        ]
    }
]);


export default router
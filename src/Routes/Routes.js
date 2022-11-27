import { createBrowserRouter } from "react-router-dom";
import AuthenticatioPage from "../Layouts/AuthenticatioPage";
import DashLayOut from "../Layouts/DashLayOut";
import Main from "../Layouts/Main";
import AllCars from "../Pages/AllCars";
import LogIn from "../Pages/Authentication/LogIn";
import Signup from "../Pages/Authentication/Signup";
import CategoryPage from "../Pages/CategoryPage";
import AllPosts from "../Pages/Dashboard/AllPosts";
import Booked from "../Pages/Dashboard/Booked";
import CreatePost from "../Pages/Dashboard/CreatePost";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import SingleCar from "../Pages/SingleCar";
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
                path:'/category/:category',
                element:<PrivateRoutes><AllCars/></PrivateRoutes>,
                loader:({params})=> fetch(`http://localhost:5000/cars/${params.category}`),
            },
            {
                path:'/cars/id/:id',
                element:<PrivateRoutes><SingleCar/></PrivateRoutes>,
                loader:({params})=> fetch(`http://localhost:5000/cars/id/${params.id}`),
            }
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
        element:<PrivateRoutes><DashLayOut/></PrivateRoutes>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:'/dash/seller/addproduct',
                element:<CreatePost/>
            },
            {
                path:'/dash/seller/addedproducts',
                element:<AllPosts/>
            },
            {
                path:'/dash/buyer/orders',
                element:<Booked/>
            },
            {
                path:'/dash/buyer/saved',
                element:<AllPosts/>
            }
        ]
    }
]);


export default router
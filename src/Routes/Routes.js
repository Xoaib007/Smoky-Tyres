import { createBrowserRouter } from "react-router-dom";
import AuthenticatioPage from "../Layouts/AuthenticatioPage";
import DashLayOut from "../Layouts/DashLayOut";
import Main from "../Layouts/Main";
import AllCars from "../Pages/AllCars";
import LogIn from "../Pages/Authentication/LogIn";
import Signup from "../Pages/Authentication/Signup";
import Blog from "../Pages/Blog";
import CategoryPage from "../Pages/CategoryPage";
import AllBuyers from "../Pages/Dashboard/AllBuyers";
import AllPosts from "../Pages/Dashboard/AllPosts";
import AllSellers from "../Pages/Dashboard/AllSellers";
import Booked from "../Pages/Dashboard/Booked";
import CreatePost from "../Pages/Dashboard/CreatePost";
import ReportedPosts from "../Pages/Dashboard/ReportedPosts";
import SavedCars from "../Pages/Dashboard/SavedCars";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import Payment from "../Pages/Payment/Payment";
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
                path:'/blog',
                element:<Blog/>
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
            },
            {
                path:'/buyer/bookings/:id',
                element:<Payment/>,
                loader: ({params})=> fetch(`http://localhost:5000/testdrivebooking/${params.id}`)
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
            }
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
                path:'/dash/buyer/bookings',
                element:<Booked/>
            },
            {
                path:'/dash/buyer/saved',
                element:<SavedCars/>
            },
            {
                path:'/dash/admin/allbuyers',
                element:<AllBuyers/>
            },
            {
                path:'/dash/admin/allsellers',
                element:<AllSellers/>
            },
            {
                path:'/dash/admin/reported',
                element:<ReportedPosts/>
            }
        ]
    }
]);


export default router
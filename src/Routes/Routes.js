import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import CategoryPage from "../Pages/CategoryPage";
import HomePage from "../Pages/Home/HomePage";

const router= createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
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
    }
]);


export default router
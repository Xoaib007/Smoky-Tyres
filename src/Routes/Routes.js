import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import HomePage from "../Pages/Home/HomePage";

const router= createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            }
        ]
    }
]);


export default router
import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [{
      path: '/',
      Component:Home,
    },
      {
        path: '/login',
     Component:Login,   
      },
      {
        path: '/register',
      Component:Register,  
      },
      {

      }
    ]
  },
]);
export default router;
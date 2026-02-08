import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";

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
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [{
      path: 'main',
      element:<MainDashboard/>
    }]
  }
]);
export default router;
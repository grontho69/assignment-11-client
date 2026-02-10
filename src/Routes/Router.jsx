import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import DashAside from "../Components/DashAside/DashAside";
import Profile from "../Pages/Dashboard/profile";
import CreateRequest from "../Pages/Dashboard/CreateRequest";

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
    element: <DashAside/>,
    children: [{
      path: 'main',
      element:<MainDashboard/>
    },
    {
      path:'profile',
      element:<Profile/>
      },
      {
        path: 'create-request',
      element:<CreateRequest/>  
      }
    
    
    
    ]
  }
]);
export default router;
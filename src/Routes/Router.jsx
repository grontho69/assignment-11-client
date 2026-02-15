import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import Profile from "../Pages/Dashboard/profile";
import CreateRequest from "../Pages/Dashboard/CreateRequest";
import MangeRequest from "../Pages/Dashboard/MangeRequest";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest";
;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <MainDashboard />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "create-request",
        element: <CreateRequest />
      },
      {
        path: "manage-request",
        element: <MangeRequest />
      },
      {
        path: "all-users",
        element: <AllUsers />
      },
      {
        path: "my-donation-requests",
        element: <MyRequest />
      }
    ],
  },
]);

export default router;
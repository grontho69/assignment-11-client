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
import Funding from "../Pages/Funding";
import DonationRequest from "../Pages/DonationRequest";
import Search from "../Pages/Search";
;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "funding",
        element:<PrivateRoute> <Funding /></PrivateRoute>
      },
      {
        path: "donation-requests",
        element: <DonationRequest />
      },
      {
        path: "search",
        element: <Search />
      }
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
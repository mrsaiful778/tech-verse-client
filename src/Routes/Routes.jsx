import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Errorpage from "../Pages/ErrorPage/Errorpage";
import Home from "../Pages/Home/Home";
import Product from "../Pages/Product/Product";
import Main from "../LayOut/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import MyProduct from "../Pages/MyProduct/MyProduct";
import Dashboard from "../LayOut/Dashboard";

import ProductDetails from "../Pages/Product/Featured/ProductDetails";
import AddHomeProduct from "../Pages/AddHomeProduct/AddHomeProduct";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Payment from "../Pages/Dashboard/MyProfile/Payment";
import DashboardAdd from "../Pages/Dashboard/AddProducts/DashboardAdd";
import UpdateProduct from "../Pages/MyProduct/UpdateProduct";
import PrivateRoute from "./PrivateRouter";
import StatisticsPage from "../Pages/Dashboard/AdminPages/StatisticsPage/StatisticsPage";
import ManageUsers from "../Pages/Dashboard/AdminPages/ManageUsers/ManageUsers";
import ManageCoupons from "../Pages/Dashboard/AdminPages/ManageCoupons/ManageCoupons";
import ProductReview from "../Pages/Dashboard/ModaratorPages/ProductReview/ProductReview";
import ReportedContents from "../Pages/Dashboard/ModaratorPages/ReportedContents/ReportedContents";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: '/product',
        element: <Product></Product>
      },
      {
        path: '/productDetails/:id',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },

      {
        path: '/addHomeProduct',
        element: <AddHomeProduct></AddHomeProduct>
      }

    ]
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute> <Payment></Payment></PrivateRoute>
      },
      {
        path: 'myproducts',
        element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>
      },
      {
        path: 'addProduct',
        element: <PrivateRoute><DashboardAdd></DashboardAdd></PrivateRoute>
      },
      {
        path: 'update/:id',
        element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>
      },
      //admin route
      {
        path: 'statisticsPage',
        element: <StatisticsPage></StatisticsPage>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'manageCoupons',
        element: <ManageCoupons></ManageCoupons>
      },
      //modarator
      {
        path: 'productReview',
        element: <ProductReview></ProductReview>
      },
      {
        path: 'reportedContents',
        element: <ReportedContents></ReportedContents>
      }
    ]
  }
]);
import { createBrowserRouter } from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";         
import MyCars from "../pages/MyCars";           
import MyBookings from "../pages/MyBookings";           
import AvailableCars from "../pages/AvailableCars"; 
import PrivateRoute from "../routers/PrivateRoute";

import CarDetails from "../pages/CarDetails";
import LearnMore from "../pages/LearnMore";
import HolidayDeal from "../pages/HolidayDeal";

const mainRoutes = createBrowserRouter([
  {
    path: "/", // Main layout path
    Component: RootLayout, // Layout component wrapping all child routes
    errorElement: <Error />, // Shown when route is not found
    children: [
      {
        index: true, // Default route for "/"
        Component: Home, // Home page component
      },
      {
        path: "/login", // Login page route
        Component: Login,
      },
      {
        path: "/register", // Register page route
        Component: Register,
      },
      {
        path: "/holiday-deal", // Register page route
        Component: HolidayDeal,
      },
      {
        path: "/learn-more", // Register page route
        Component: LearnMore,
      },

      {
        path: "/add-car", // Protected route to add car
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars", 
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path: "/available-cars", 
        Component: AvailableCars,
      },
     {
        path: "car-details/:id",
        element: <CarDetails />,},
      {
        path: "/my-bookings", 
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default mainRoutes;

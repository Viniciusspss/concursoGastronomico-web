import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layouts/auth";
import { SignIn as SignInUser } from "../pages/auth/user/Sign-in";
import { SignUp as SignUpUser } from "../pages/auth/user/Sign-up";
import { SignIn as SignInRestaurant } from "../pages/auth/restaurant/Sign-in";
import { SignUp as SignUpRestaurant } from "../pages/auth/restaurant/Sign-up";
import { SelectProfile } from "../pages/auth/SelectProfile";
import { AppLayout } from "@/pages/_layouts/app";
import { Dishes } from "@/pages/app/dishes/Dishes";
import { Profile } from "@/pages/app/profile/Profile";
import { EditProfile } from "@/pages/app/profile/EditProfile";
import { NotFound } from "@/pages/NotFound";
import { PrivateRoute } from "@/components/PrivateRoute";
import { EvaluateDish } from "@/pages/app/dishes/EvaluateDish";
import { About } from "@/pages/app/About";
import { RestaurantDishes } from "@/pages/app/restaurant/dishes/RestaurantDishes";
import { EditDish } from "@/pages/app/restaurant/dishes/EditDish";
import { CreateDishForm } from "@/components/CreateDishForm";
import { Restaurants } from "@/pages/app/restaurant/Restaurants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectProfile />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [

      {
        path: "SignIn",
        children: [
          { path: "User", element: <SignInUser /> },
          { path: "Restaurant", element: <SignInRestaurant /> },
        ],
      },
      {
        path: "SignUp",
        children: [
          { path: "User", element: <SignUpUser /> },
          { path: "Restaurant", element: <SignUpRestaurant /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/Dishes",
        element: (
          <PrivateRoute type="client">
            <Dishes />
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurants",
        element: (
          <PrivateRoute type="client">
            <Restaurants />
          </PrivateRoute>
        ),
      },
      {
        path: "/Profile",
        element: (
          <PrivateRoute type="client">
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/EditProfile",
        element: (
          <PrivateRoute type="client">
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/evaluate-dish",
        element: (
          <PrivateRoute type="client">
            <EvaluateDish />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant-dishes/:id",
        element: (
          <PrivateRoute type="restaurant">
            <RestaurantDishes />
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant-edit-dish/:dishId",
        element: (
          <PrivateRoute type="restaurant">
            <EditDish />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-dish",
        element: (
          <PrivateRoute type="restaurant">
            <CreateDishForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

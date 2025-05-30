import { ClientType } from "@/types/user/client";
import { RestaurantType } from "@/types/user/restaurant";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice/authSlice";

export function useDeleteUser() {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function deleteUser(cb?: () => void) {
    const dataUsers = localStorage.getItem("clients");
    const dataRestaurants = localStorage.getItem("restaurants");

    const storageClients: ClientType[] = dataUsers ? JSON.parse(dataUsers) : [];
    const storageRestaurants: RestaurantType[] = dataRestaurants
      ? JSON.parse(dataRestaurants)
      : [];

    if (user && "email" in user) {
      const clients = storageClients.filter((c) => c.id !== user.id);
      localStorage.setItem("clients", JSON.stringify(clients));
    } else if (user) {
      const restaurants = storageRestaurants.filter((r) => r.id !== user.id);
      localStorage.setItem("restaurants", JSON.stringify(restaurants));
    }

    dispatch(logout());
    if (cb) cb();
    navigate("/");
  }

  return { deleteUser };
}

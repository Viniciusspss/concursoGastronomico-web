import { getAllDishesResponse } from "@/types/dishes";
import { Button } from "./ui/button";
import { useState } from "react";
import { DishDialog } from "./DishDialog";
import { Dialog } from "./ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setSelectedDish } from "@/store/slices/dishSlice/dishSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

type DishCardProps = {
  dish: getAllDishesResponse;
};

export function DishCard({ dish }: DishCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const qtdReviews = dish.reviews.length;
  const dispatch = useAppDispatch();
  const { selectedDish } = useAppSelector((state) => state.dishes);
  const navigate = useNavigate();

  const ratings = dish.reviews.map(r => r.rating);
  const average = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;


  function handleOpen() {
    setDialogOpen(true);
    dispatch(setSelectedDish(dish));
  }

  function handleSelectDish() {
    dispatch(setSelectedDish(dish))
    navigate(`/dish-reviews/${dish.id}`)
  }

  function handleEditDish() {
    dispatch(setSelectedDish(dish));
    navigate(`/restaurant-edit-dish/${selectedDish?.id}`);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    dispatch(setSelectedDish(null));
  }

  return (
    <div className="flex h-110 flex-col shadow-2xl hover:cursor-pointer">
      <div className="h-55 w-full">
        <img
          src={`http://localhost:8080/api/uploads/${dish.image_url}`}
          alt="Foto do prato"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-between gap-2 px-3 py-3">
        <div className="mt-5 flex w-full justify-between gap-8">
          <div className="flex flex-col items-start wrap-anywhere">
            <h1 className="font-bold text-[var(--color-primary)]">
              {dish.name}
            </h1>
            <p className="text-sm text-[var(--text-primary)]">
              {dish.restaurant.name}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div>
              {qtdReviews === 1 ? (
                <div>
                  <p>{average}</p>
                  <p className="text-[11px] text-[var(--text-primary)]">
                    (1 avaliação)
                  </p>
                </div>
              ) : (
                <div className="flex items-center text-[13px] gap-1">
                  <p>{average}</p>
                  <p className="text-[11px] text-[var(--text-primary)]">
                    ({qtdReviews} avaliações)
                  </p>

                </div>
              )}
            </div>
            <div className="flex gap-1">
              <StarRating readOnly totalStars={5} value={Number(average)} />
            </div>
          </div>
        </div>
        <p className="text-left text-sm break-words text-[var(--text-muted)]">
          {dish.details}
        </p>
        <div className="flex w-full items-center justify-center">
          {user && "email" in user && (
            <div className="flex justify-between w-full">
              <Button
                onClick={handleOpen}
                variant="default"
                className="w-[48%] hover:cursor-pointer"
              >
                Avaliar prato
              </Button>
              <Button onClick={handleSelectDish} className="w-[48%] hover:cursor-pointer" variant="white">
                Ver avaliações
              </Button>
            </div>
          )}

          {user && "cnpj" in user && (
            <div className="flex justify-between w-full">
              <Button
                onClick={handleEditDish}
                variant="default"
                className="w-[48%] hover:cursor-pointer"
              >
                Editar prato
              </Button>
              <Button onClick={handleSelectDish} className="w-[48%] hover:cursor-pointer " variant="white">
                Ver avaliações
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DishDialog onClose={handleCloseDialog} />
      </Dialog>
    </div>
  );
}

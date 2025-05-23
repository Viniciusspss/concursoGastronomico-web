import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDish, loadAllDishes, loadRestaurantDishes } from "./dishThunks";

interface DishState {
  dishes: DishesWithRestaurant[];
  restaurantDishes: DishesType[];
  selectedDish: DishesWithRestaurant | null;
  errorCreateDish: string | null;
}

const initialState: DishState = {
  dishes: [],
  restaurantDishes: [],
  selectedDish: null,
  errorCreateDish: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorCreateDish = null;
    },
    setSelectedDish(state, action: PayloadAction<DishesWithRestaurant | null>) {
      state.selectedDish = action.payload;
    },
    editDish: (
      state,
      action: PayloadAction<{
        dishId: string;
        title: string;
        price: number;
        description: string;
      }>,
    ) => {
      const { dishId, price, description, title } = action.payload;
      const updatedDishes = state.restaurantDishes.map((dish) => {
        if (dish.id === dishId) {
          return {
            ...dish,
            title,
            price,
            description,
          };
        }
        return dish;
      });

      state.restaurantDishes = updatedDishes;
      localStorage.setItem("restaurantDishes", JSON.stringify(updatedDishes));
    },
    deleteDish: (state, action: PayloadAction<{ dishId: string }>) => {
      const updatedDishes = state.restaurantDishes.filter(
        (dish) => dish.id !== action.payload.dishId,
      );

      state.restaurantDishes = updatedDishes;
      localStorage.setItem("restaurantDishes", JSON.stringify(updatedDishes));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadAllDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
    });

    builder.addCase(loadRestaurantDishes.fulfilled, (state, action) => {
      state.restaurantDishes = action.payload;
    });

    builder.addCase(createDish.fulfilled, (state, action) => {
      state.restaurantDishes = action.payload;
    });
    builder.addCase(createDish.rejected, (state, action) => {
      state.errorCreateDish = action.payload as string;
    });
  },
});

export const { editDish, deleteDish, setSelectedDish, clearError } =
  dishSlice.actions;
export default dishSlice.reducer;

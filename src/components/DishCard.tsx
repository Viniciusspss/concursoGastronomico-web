import { DishesType } from "@/types/dishes";
import pratoImage from "@/assets/pratoImage.jpg";
import { StarIcon } from "lucide-react";

type DishCardProps = {
  dish: DishesType;
};

export function DishCard({ dish }: DishCardProps) {
  return (
    <div className="w-auto bg-[#2C2C2C] hover:cursor-pointer">
      <div className="h-30 w-full overflow-hidden">
        <img
          src={pratoImage}
          alt="Foto do prato"
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-2 px-3 py-3">
        <h1 className="font-bold text-amber-500">{dish.title}</h1>
        <p className="text-left text-sm break-words text-amber-100">
          {dish.description}
        </p>
        <div className="flex gap-2">
          <StarIcon className="text-amber-400" />
          <StarIcon className="text-amber-400" />
          <StarIcon className="text-amber-400" />
          <StarIcon className="text-amber-400" />
          <StarIcon className="text-amber-400" />
        </div>
      </div>
    </div>
  );
}

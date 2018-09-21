import {Ingredient} from "./ingredient";
import {Preparation} from "./preparation";
import {RecipeProcess} from "./recipeProcess";

export class Recipe {

  recipeId: number;
  name: string;
  calorie: number;
  price: number;
  category: string;
  ingredients: Ingredient[];
  preparations: Preparation[];
  processes: RecipeProcess[];

}

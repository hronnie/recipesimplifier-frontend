import {Ingredient} from "./ingredient";
import {Preparation} from "./preparation";
import {RecipeProcess} from "./recipeProcess";

export class Recipe {
  id: number;
  name: string;
  calorie: number;
  price: number;
  Ingredient: Ingredient[];
  Preparation: Preparation[];
  RecipeProcess: RecipeProcess[];
}

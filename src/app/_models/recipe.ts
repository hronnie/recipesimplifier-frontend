import {Ingredient} from "./ingredient";
import {Preparation} from "./preparation";
import {RecipeProcess} from "./recipeProcess";

export class Recipe {

  constructor(public id: number,
              public name: string,
              public calorie: number,
              public price: number,
              public Ingredient: Ingredient,
              public Preparation: Preparation,
              public RecipeProcess: RecipeProcess) {}

  id: number;
  name: string;
  calorie: number;
  price: number;
  Ingredient: Ingredient[];
  Preparation: Preparation[];
  RecipeProcess: RecipeProcess[];

}

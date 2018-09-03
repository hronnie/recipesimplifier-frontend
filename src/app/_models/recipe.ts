import {Ingredient} from "./ingredient";
import {Preparation} from "./preparation";
import {RecipeProcess} from "./recipeProcess";

export class Recipe {

  constructor(public recipeId: number,
              public name: string,
              public calorie: number,
              public price: number,
              public category: string,
              public ingredients: Ingredient[],
              public preparations: Preparation[],
              public recipeProcesses: RecipeProcess[]) {}

}

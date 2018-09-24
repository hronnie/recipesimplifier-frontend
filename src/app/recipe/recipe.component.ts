import { Component, OnInit } from '@angular/core';
import {Recipe} from "../_models";
import {Observable} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";
import {RecipeService} from "../_services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppSettings} from "../_commons";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  isRecipeLoded: boolean;
  filteredRecipes: Observable<Recipe>;
  recipeForm: FormGroup;
  displayRecipe: Recipe;
  recipeImageAlbum: string[];

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder
  ) {

    this.recipeForm = formBuilder.group({
      recipeName: new FormControl('', []),
    });

    this.filteredRecipes = this.recipeForm.get('recipeName').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.recipeService.search({name: value}, 1))
      );
  }

  ngOnInit() {
  }

  initImageAlbum(recipe) {
    this.recipeImageAlbum = [];

    if (recipe.recipeImg1) {
      this.recipeImageAlbum.push(AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + recipe.recipeId + '/' + 1);
    }
    if (recipe.recipeImg2) {
      this.recipeImageAlbum.push(AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + recipe.recipeId + '/' + 2);
    }
    if (recipe.recipeImg3) {
      this.recipeImageAlbum.push(AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + recipe.recipeId + '/' + 3);
    }
    if (recipe.recipeImg4) {
      this.recipeImageAlbum.push(AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + recipe.recipeId + '/' + 4);
    }
    if (recipe.recipeImg5) {
      this.recipeImageAlbum.push(AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + recipe.recipeId + '/' + 5);
    }
  }

  displayRecipeHelper(recipe: Recipe) {
    if (recipe) {
      return recipe.name;
    }
  }

  showSelectedRecipe(recipe: Recipe) {
    this.displayRecipe = recipe;
    this.initImageAlbum(recipe);
    this.isRecipeLoded = true;
  }

}

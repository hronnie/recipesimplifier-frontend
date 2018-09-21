import { Component, OnInit } from '@angular/core';
import {Recipe, RecipeImageAlbum} from "../_models";
import {Observable} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";
import {RecipeService} from "../_services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  imgSrc = 'http://localhost:8080/api/admin/recipeimage/1/1';
  imageAlbum: RecipeImageAlbum;

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
    if (recipe.ima)
    imageAlbum.recipeImg1
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

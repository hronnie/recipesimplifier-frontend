import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from "../../_commons";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})

export class AdminRecipeComponent   {

  recipeForm: FormGroup;
  titleAlert: string = 'Ezt a mezőt kötelező kitölteni';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.recipeForm = formBuilder.group({
      recipeName: [null, Validators.required],
      preparations: this.formBuilder.array([ this.createPreparation()]),
      ingredients: this.formBuilder.array([ this.createIngredient()]),
      processes: this.formBuilder.array([ this.createProcess()])
    });

  }

  // preparations related methods

  createPreparation(): FormGroup {
    return this.formBuilder.group({
      description: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      duration: [null, Validators.required]
    });
  }

  get preparations(): FormArray {
    return this.recipeForm.get('preparations') as FormArray;
  };

  addPreparation(): void {
    this.preparations.push(this.createPreparation());
  }

  removePreparation(index): void {
    this.preparations.removeAt(index);
  }

  // ingredients related methods

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      unit: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index): void {
    this.ingredients.removeAt(index);
  }

  // process related methods

  createProcess(): FormGroup {
    return this.formBuilder.group({
      description: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      duration: [null, Validators.required]
    });
  }

  get processes(): FormArray {
    return this.recipeForm.get('processes') as FormArray;
  };

  addProcess(): void {
    this.processes.push(this.createProcess());
  }

  removeProcess(index): void {
    this.processes.removeAt(index);
  }
  ngOnInit() {  }

  addPost(post) {
    this.http.post(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/newrecipe',
      {name: post.recipeName, ingredients: post.ingredients, preparations: post.preparations, processes: post.processes})
      .subscribe(res => console.log(res.toString()));
  }

}

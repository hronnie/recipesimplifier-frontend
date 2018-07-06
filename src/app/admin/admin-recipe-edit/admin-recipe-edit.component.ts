import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from "../../_commons";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-recipe-edit',
  templateUrl: './admin-recipe-edit.component.html',
  styleUrls: ['./admin-recipe-edit.component.css']
})
export class AdminRecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  responseSuccessMsg: String;
  responseErrorMsg: String;
  isRecipeLoded: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.recipeForm = formBuilder.group({
      recipeName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40) ]),
      preparations: this.formBuilder.array([ this.createPreparation()]),
      ingredients: this.formBuilder.array([ this.createIngredient()]),
      processes: this.formBuilder.array([ this.createProcess()]),
      calorie: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required]
    });

    this.isRecipeLoded = false;

  }

  // preparations related methods

  createPreparation(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])]),
      duration: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
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
      name: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      quantity: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4)])
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
      description: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])]),
      duration: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
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
    this.responseSuccessMsg = "";
    this.responseErrorMsg = "";
    this.http.post(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/newrecipe',
      {name: post.recipeName,
        ingredients: post.ingredients,
        preparations: post.preparations,
        processes: post.processes,
        calorie: post.calorie,
        price: post.price,
        category: post.category
      })
      .subscribe(res =>
        {
          this.responseSuccessMsg = "A recept sikeresen el lett tárolva :) ";
          this.recipeForm.reset();
        }, err => {
          if (err.status === 422) {
            this.responseErrorMsg = "Az elküldött recept nem megfelelő";
          } else if (err.status === 401) {
            this.responseErrorMsg = "Autentikációs hiba, a recept elküldéséhez be kell jelentkezni"
          } else if (err.status === 500) {
            this.responseErrorMsg = "Rendszerhiba történt, szólj kérlek a rendszergazdának: aron.harsfalvi@gmail.com"
          } else {
            this.responseErrorMsg = "Ismeretlen hiba"
          }
        }
      );
  }
}

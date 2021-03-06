import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientInfoService, RecipeService, UploadFileService} from "../../_services";
import {AppSettings} from "../../_commons";

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})

export class AdminRecipeComponent   {

  recipeForm: FormGroup;
  responseSuccessMsg: String;
  responseErrorMsg: String;

  infoRefArray : any;

  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private ingrInfoService: IngredientInfoService) {

    this.recipeForm = formBuilder.group({
      recipeName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40) ]),
      preparations: this.formBuilder.array([ this.createPreparation()]),
      ingredients: this.formBuilder.array([ this.createIngredient()]),
      processes: this.formBuilder.array([ this.createProcess()]),
      calorie: [null, null],
      price: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.infoRefArray = this.ingrInfoService.findAll();
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
      quantity: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]),
      ingredientInfoId: new FormControl('', [Validators.required])
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

  addPost(post) {
    //this.currentFileUpload = this.selectedFiles.item(0);
    this.responseSuccessMsg = "";
    this.responseErrorMsg = "";
    if (post.calorie == null) {
      post.calorie = "-";
    }

    let inputDto = {
      recipeId: null,
      name: post.recipeName,
      calorie: post.calorie,
      price: post.price,
      category: post.category,
      ingredients: post.ingredients,
      preparations: post.preparations,
      processes: post.processes
    }

    this.recipeService.create(inputDto)
      .subscribe(res =>
        {
          this.responseSuccessMsg = AppSettings.HTTP_MSG_200_RECIPE_CREATE;
          this.recipeForm.reset();
        }, err => {
          if (err.status === 422) {
            this.responseErrorMsg = AppSettings.HTTP_MSG_422_BAD_DATA_RECIPE;
          } else if (err.status === 401) {
            this.responseErrorMsg = AppSettings.HTTP_MSG_401_AUTH_ERROR;
          } else if (err.status === 500) {
            this.responseErrorMsg = AppSettings.HTTP_MSG_500_INTERNAL_SERVER_ERROR;
          } else {
            this.responseErrorMsg = AppSettings.HTTP_MSG_UNKNOWN;
          }
        }
      );
  }
}

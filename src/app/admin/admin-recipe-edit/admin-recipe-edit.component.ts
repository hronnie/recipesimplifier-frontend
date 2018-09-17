import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientInfoService, RecipeService, UploadFileService} from "../../_services";
import {Recipe} from "../../_models";
import {Observable} from "rxjs";
import {switchMap, debounceTime} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from "@angular/material";

@Component({
  selector: 'app-admin-recipe-edit',
  templateUrl: './admin-recipe-edit.component.html',
  styleUrls: ['./admin-recipe-edit.component.css']
})
export class AdminRecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  responseSuccessMsg: String;
  responseErrorMsg: String;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  infoRefArray : any;

  isRecipeLoded: boolean;
  filteredRecipes: Observable<Recipe>;

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadFileService,
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

    this.isRecipeLoded = false;
    this.filteredRecipes = this.recipeForm.get('recipeName').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.recipeService.search({name: value}, 1))
      );
  }

  ngOnInit() {
    this.infoRefArray = this.ingrInfoService.findAll();
  }

  showSelectedRecipe(recipe: Recipe) {
    this.recipeForm.patchValue({
      recipeName: recipe.name,
      preparations: recipe.preparations,
      ingredients: recipe.ingredients,
      processes: recipe.processes,
      calorie: recipe.calorie,
      price: recipe.price,
      category: recipe.category
    });
  }

  displayFn(recipe: Recipe) {
    if (recipe) {
      return recipe.name;
    }
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

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload() {
  //   this.progress.percentage = 0;
  //
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       console.log('File is completely uploaded!');
  //     }
  //   });
  //
  //   this.selectedFiles = undefined;
  // }



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


    this.selectedFiles = undefined;
  }

}

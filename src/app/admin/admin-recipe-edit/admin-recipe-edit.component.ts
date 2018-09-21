import { Component, OnInit, VERSION, Input, OnChanges } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientInfoService, RecipeImageService, RecipeService, UploadFileService} from "../../_services";
import {Recipe, RecipeImageAlbum, UploadFileResponse} from "../../_models";
import {Observable} from "rxjs";
import {switchMap, debounceTime} from 'rxjs/operators';
import {AppSettings} from "../../_commons";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {HttpEventType, HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-admin-recipe-edit',
  templateUrl: './admin-recipe-edit.component.html',
  styleUrls: ['./admin-recipe-edit.component.css']
})
export class AdminRecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  recipeId: number;
  responseSuccessMsg: String;
  responseErrorMsg: String;
  imgResponseErrMsg: String;
  imgResponseSuccessMsg: String;

  selectedFiles: FileList;
  currentFileUpload: File;
  infoRefArray : any;
  recipeCategoryArray : any[];

  isRecipeLoded: boolean;
  filteredRecipes: Observable<Recipe>;
  hideImageManageSection: boolean;

  recipeImageAlbum: any;

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadFileService,
              private recipeService: RecipeService,
              private ingrInfoService: IngredientInfoService,
              private recipeImageService: RecipeImageService,
              public modal: Modal) {

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
    this.recipeCategoryArray = [
      {id: "soup", name: "Leves"},
      {id: "mainCourse", name: "Főétel"},
      {id: "salad", name: "Saláta"},
      {id: "dessert", name: "Desszert"}
    ]
    this.hideImageManageSection = true;
  }

  refreshImageAlbum() {
    this.recipeImageAlbum = this.recipeImageService.getRecipeImages(this.recipeId)
      .subscribe(res =>
        {
          this.recipeImageAlbum = res;
        }, err => {
          console.error("Couldn't fetch image album");
        }
      );
  }

  removeRecipeImage(index) {
    const dialogRef = this.modal.confirm()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .cancelBtn("Mégse")
      .title('Törlés megerősítése')
      .body(`
              <h3>Tényleg törölni akarod a képet?</h3>
              `)
      .open();

    dialogRef.result
      .then( result =>
        {
          if (result) {
            this.doImageDelete(index);
          }
        }
      );
  }

  doImageDelete(index) {
    this.recipeImageService.delete(this.recipeId, index)
      .subscribe(res =>
        {
          this.imgResponseSuccessMsg = "Sikeres törlés";
          this.refreshImageAlbum();
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

  isRecipeImageAvailable(index) {
    switch (index) {
      case 1: {
        return this.recipeImageAlbum.recipeImg1;
      }
      case 2: {
        return this.recipeImageAlbum.recipeImg2;
      }
      case 3: {
        return this.recipeImageAlbum.recipeImg3;
      }
      case 4: {
        return this.recipeImageAlbum.recipeImg4;
      }
      case 5: {
        return this.recipeImageAlbum.recipeImg5;
      }
    }
  }

  toggleImageUpload() {
    this.refreshImageAlbum();
    this.hideImageManageSection = !this.hideImageManageSection;
  }

  showSelectedRecipe(recipe: Recipe) {
    this.recipeId = recipe.recipeId;
    this.recipeForm.patchValue({
      recipeName: recipe.name,
      calorie: recipe.calorie,
      price: recipe.price,
      category: recipe.category
    });

    this.recipeForm.setControl('preparations', this.formBuilder.array((recipe.preparations || []).map((x) => this.formBuilder.group(x))));
    this.recipeForm.setControl('ingredients', this.formBuilder.array((recipe.ingredients || []).map((x) => this.formBuilder.group(x))));
    this.recipeForm.setControl('processes', this.formBuilder.array((recipe.processes || []).map((x) => this.formBuilder.group(x))));

    this.isRecipeLoded = true;
  }

  displayFn(recipe: Recipe) {
    if (recipe) {
      return recipe.name;
    }
  }

  // preparations related methods

  createPreparation(): FormGroup {
    return this.formBuilder.group({
      preparationId: new FormControl('', []),
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
      ingredientId: new FormControl('', []),
      name: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      quantity: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]),
      ingredientInfoId: new FormControl('', [])
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
      processId: new FormControl('', []),
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

  upload(index) {
    if (!this.selectedFiles || this.selectedFiles === undefined) {
      this.imgResponseErrMsg = "Még nem választottál ki fájlt";
      return;
    }
    this.imgResponseErrMsg = null;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, index, this.recipeId).subscribe(event => {
      if (event instanceof HttpResponse) {
        let result: UploadFileResponse;
        result = JSON.parse(event.body.toString());
        if (event.status === 200) {
          this.imgResponseSuccessMsg = "A kép mentése sikeres volt: " + result.fileName;
          this.refreshImageAlbum();
        } else {
          this.imgResponseErrMsg = "A kép mentése sikertelen volt: " + result.fileName;
        }
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  isUploadButtonDisabled(index) {
    if (!this.selectedFiles) {
      return true
    }
    return !this.selectedFiles.item(index);
  }

  onFormSubmit(recipeForm, action){
    let inputDto = {
      recipeId: this.recipeId,
      name: recipeForm.recipeName,
      calorie: recipeForm.calorie,
      price: recipeForm.price,
      category: recipeForm.category,
      ingredients: recipeForm.ingredients,
      preparations: recipeForm.preparations,
      processes: recipeForm.processes
    }

    if (action === 'edit') {
      this.recipeService.update(inputDto)
        .subscribe(res =>
          {
            this.responseSuccessMsg = AppSettings.HTTP_MSG_200_RECIPE_UPDATE;
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
    } else if (action === 'delete'){
        const dialogRef = this.modal.confirm()
          .size('sm')
          .isBlocking(true)
          .showClose(true)
          .keyboard(27)
          .cancelBtn("Mégse")
          .title('Törlés megerősítése')
          .body(`
              <h3>Tényleg törölni akarod a receptet?</h3>
              `)
          .open();

        dialogRef.result
          .then( result =>
            {
              if (result) {
                this.doDelete();
                this.recipeId = null;
              }
            }
          );
    }
  }

  doDelete() {
    this.recipeService.delete(this.recipeId)
      .subscribe(res =>
        {
          this.responseSuccessMsg = AppSettings.HTTP_MSG_200_RECIPE_DELETE;
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
    this.recipeForm.reset();
  }

  editRecipe() {
    this.responseSuccessMsg = "";
    this.responseErrorMsg = "";
    let calorie = this.recipeForm.controls.calorie.value;
    if (calorie === null) {
      calorie = "-";
    }
    let inputDto = {
      recipeId: this.recipeForm.controls.recipeId,
      name: this.recipeForm.controls.recipeName,
      calorie: calorie,
      price: this.recipeForm.controls.price,
      category: this.recipeForm.controls.category,
      ingredients: this.recipeForm.controls.ingredients,
      preparations: this.recipeForm.controls.preparations,
      processes: this.recipeForm.controls.processes
    }

  }

}

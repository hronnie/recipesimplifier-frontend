import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from "../../_commons";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})

export class AdminReceiptComponent   {

  recipeForm: FormGroup;
  post: any;                     // A property for our submitted form
  recipeName: string = '';
  preparation: string = '';
  process: string = '';
  titleAlert: string = 'Ezt a mezőt kötelező kitölteni';
  showIng: FormArray;
  showProcesses: FormArray;

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
    this.ingredients.removeAt(index);
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
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    debugger;
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
  ngOnInit() {

    // this.recipeForm.get('validate').valueChanges.subscribe(
    //   (validate) => {
    //     if (validate == '1') {
    //       this.recipeForm.get('recipeName').setValidators([Validators.required, Validators.minLength(3)]);
    //       this.titleAlert = "Legalább 3 karakter hosszúnak kell lennie";
    //     } else {
    //       this.recipeForm.get('recipeName').setValidators(Validators.required);
    //     }
    //     this.recipeForm.get('recipeName').updateValueAndValidity();
    //   }
    // )
  }

  addPost(post) {
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // let token = "Bearer " + currentUser.access_token;
    // let headers = new HttpHeaders().set("Authorization", token);
    this.http.post(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/newrecipe',
      {name: post.recipeName, ingredients: post.ingredients, preparations: post.preparations, processes: post.processes})
      .subscribe(res => console.log(res.toString()));
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem("currentUser"));
    // this.http.post(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/newrecipe', {
    //   name:post.name,
    //   ingredients: post.ingredients,
    //   preparations: post.preparations,
    //   processes: post.processes}).subscribe(res => console.log(res.toString()));
    // this.recipeName = post.recipeName;
    // this.preparation = post.preparation;
    // this.process = post.process;
    // this.showIng = post.ingredients;
    // this.showProcesses = post.processes;
  }

}

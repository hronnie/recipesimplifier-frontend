import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})

export class AdminReceiptComponent   {

  receiptForm: FormGroup;
  post: any;                     // A property for our submitted form
  receiptName: string = '';
  preparation: string = '';
  process: string = '';
  titleAlert: string = 'Ezt a mezőt kötelező kitölteni';
  showIng: FormArray;
  showProcesses: FormArray;

  constructor(private formBuilder: FormBuilder) {

    this.receiptForm = formBuilder.group({
      receiptName: [null, Validators.required],
      preparation: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      validate : '',
      ingredients: this.formBuilder.array([ this.createIngredient()]),
      processes: this.formBuilder.array([ this.createProcess()])
    });

  }

  // ingredients related methods

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      unit: [null, Validators.required],
    });
  }

  get ingredients(): FormArray {
    return this.receiptForm.get('ingredients') as FormArray;
  };

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  // process related methods

  createProcess(): FormGroup {
    return this.formBuilder.group({
      description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])]
    });
  }

  get processes(): FormArray {
    return this.receiptForm.get('processes') as FormArray;
  };

  addProcess(): void {
    this.processes.push(this.createProcess());
  }

  ngOnInit() {

    this.receiptForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.receiptForm.get('receiptName').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "Legalább 3 karakter hosszúnak kell lennie";
        } else {
          this.receiptForm.get('receiptName').setValidators(Validators.required);
        }
        this.receiptForm.get('receiptName').updateValueAndValidity();
      }
    )
  }

  addPost(post) {
    this.receiptName = post.receiptName;
    this.preparation = post.preparation;
    this.process = post.process;
    this.showIng = post.ingredients;
    this.showProcesses = post.processes;
  }

}

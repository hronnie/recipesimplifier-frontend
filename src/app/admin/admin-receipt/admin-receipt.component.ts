import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})

export class AdminReceiptComponent   {
  
    rForm: FormGroup;
    post:any;                     // A property for our submitted form
    name:string = '';
    ingredient:string = '';
    unit:string = '';
    preparation:string = '';
    process:string = '';
    titleAlert:string = 'Ezt a mezőt kötelező kitölteni';
  
    constructor(private fb: FormBuilder) {
  
      this.rForm = fb.group({
        'name': [null, Validators.required],
        'ingredient': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        'preparation': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        'process': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        'unit': [null, Validators.required],
        'validate' : ''
      });
  
    }

    ngOnInit() {

        this.rForm.get('validate').valueChanges.subscribe(
          (validate) => {
            if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = "Legalább 3 karakter hosszúnak kell lennie";
            } else {
              this.rForm.get('name').setValidators(Validators.required);
            }
            this.rForm.get('name').updateValueAndValidity();
          }
        )
      }
    
      addPost(post) {
        this.ingredient = post.ingredient;
        this.name = post.name;
        this.unit = post.unit;
        this.preparation = post.preparation;
        this.process = post.preparation;
      }
    
}
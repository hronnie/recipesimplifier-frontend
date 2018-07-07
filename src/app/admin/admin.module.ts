import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRecipeEditComponent } from './admin-recipe-edit/admin-recipe-edit.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  declarations: [AdminMainComponent, AdminRecipeComponent, AdminRecipeEditComponent]
})
export class AdminModule { }

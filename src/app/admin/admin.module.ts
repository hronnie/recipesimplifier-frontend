import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRecipeEditComponent } from './admin-recipe-edit/admin-recipe-edit.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { IngredientInfoComponent } from './ingredient-info/ingredient-info.component';
import {AgGridModule} from "ag-grid-angular";

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
    AgGridModule.withComponents([IngredientInfoComponent])
  ],
  declarations: [
    AdminMainComponent,
    AdminRecipeComponent,
    AdminRecipeEditComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    IngredientInfoComponent]
})
export class AdminModule { }

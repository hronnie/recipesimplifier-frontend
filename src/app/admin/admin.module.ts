import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRecipeEditComponent } from './admin-recipe-edit/admin-recipe-edit.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { IngredientInfoComponent } from './ingredient-info/ingredient-info.component';
import {AgGridModule} from "ag-grid-angular";
import {ModalModule} from "ngx-modialog";
import {BootstrapModalModule} from "ngx-modialog/plugins/bootstrap";

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
    AgGridModule.withComponents([IngredientInfoComponent]),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    AdminMainComponent,
    AdminRecipeComponent,
    AdminRecipeEditComponent,
    IngredientInfoComponent]
})
export class AdminModule { }

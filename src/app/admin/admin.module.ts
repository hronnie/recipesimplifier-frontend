import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRecipeEditComponent } from './admin-recipe-edit/admin-recipe-edit.component';
import {MatFormFieldModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  declarations: [AdminMainComponent, AdminRecipeComponent, AdminRecipeEditComponent]
})
export class AdminModule { }

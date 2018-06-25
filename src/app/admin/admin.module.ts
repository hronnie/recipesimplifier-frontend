import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AdminMainComponent, AdminRecipeComponent]
})
export class AdminModule { }

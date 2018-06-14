import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminReceiptComponent } from './admin-receipt/admin-receipt.component';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [AdminMainComponent, AdminReceiptComponent]
})
export class AdminModule { }

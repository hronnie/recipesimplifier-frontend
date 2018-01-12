import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminReceiptComponent } from './admin-receipt/admin-receipt.component';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [AdminMainComponent, AdminReceiptComponent]
})
export class AdminModule { }

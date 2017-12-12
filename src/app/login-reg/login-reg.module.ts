import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginService } from "app/services/login-reg/login.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService],
})
export class LoginRegModule { 

  
}

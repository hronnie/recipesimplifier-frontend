import { Component, OnInit } from '@angular/core';
import { LoginService } from "app/services/login-reg/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users;

  constructor(private loginService: LoginService) { 
    this.users = loginService.getUsers();
  }

  ngOnInit() {
  }

  

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(6)
        ]);
        this.password = new FormControl('', [
            Validators.required
        ]);
        // Form validation
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
    }

    login() {
        this.loading = true;
        
        this.authenticationService.login(this.email.value, this.password.value)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    if (error.status === 500) {
                        this.alertService.error("Hiba történt a bejelentkezés során: az email vagy jelszó nem megfelelő.");
                    } else {
                        this.alertService.error("Ismeretlen hiba történt a bejelentkezés során");
                    }
                    
                    this.loading = false;
                });
    }
}

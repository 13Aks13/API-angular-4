/**
 * Created by Andrew K. on 28.04.17.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    moduleId: module.id,
//    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .then(res => {
                if (res === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Email or password is incorrect';
                    this.loading = false;
                }
            });
    }
}

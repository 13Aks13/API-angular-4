/**
 * Created by Andrew K. on 11.05.17.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../services/user.service';
import { ValidateService } from '../services/validate.service';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    username: String;
    email: String;
    password: String;

    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private flashMessagesService: FlashMessagesService,
        private validateService: ValidateService,
    ) { }

    register() {
        this.loading = true;
        const user = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        let vUser = true;
        let vEmail = true;

        // Required fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
            vUser = false;
        }

        // Validate email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
            vEmail = false;
        }

        if (vUser  && vEmail) {
            // Need User model for create
            this.userService.create(user)
                .then(
                    data => {
                        this.flashMessagesService.show('Registration successful', {cssClass: 'alert-success', timeout: 5000});
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.flashMessagesService.show(error, {cssClass: 'alert-danger', timeout: 3000});
                        this.loading = false;
                    });
        }
    }
}

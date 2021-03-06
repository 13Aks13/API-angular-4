/**
 * Created by Andrew K. on 28.04.17.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';


// Service
import { AppConfig } from '../config/app.config';
import { AuthenticationService } from '../services/authentication.service';
import { ValidateService } from '../services/validate.service';


@Component({
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]

})

export class LoginComponent implements OnInit {
    email: string;
    password: string;

    model: any = {};
    loading = false;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appConfig: AppConfig,
        private authenticationService: AuthenticationService,
        private flashMessagesService: FlashMessagesService,
        private validateService: ValidateService,
    ) { }


    getDomain(): string {
        return this.appConfig.getConfig('domain');
    }

    ngOnInit() {
        // clear token remove user from local storage to log user out
        this.authenticationService.clear();

        this.appConfig.load().then((res) => {
            // Set domain from config
            this.authenticationService.domain = this.getDomain();
            console.log(this.authenticationService.domain);
        });
    }

    login() {
        this.loading = true;
        const user = {
            email: this.email,
            password: this.password
        }

        let vPassword = true;
        let vEmail = true;

        // Required fields
        if (!this.validateService.validateEmailPassw(user)) {
            this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
            vPassword = false;
        }

        // Validate email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
            vEmail = false;
        }

        if (vPassword  && vEmail) {
            this.authenticationService.login(user.email, user.password)
                .subscribe(
                    data => {
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.flashMessagesService.show(error, {cssClass: 'alert-danger', timeout: 3000});
                        this.loading = false;
                    });
        }
    }

}

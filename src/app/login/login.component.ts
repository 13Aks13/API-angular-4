/**
 * Created by Andrew K. on 28.04.17.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.flashMessagesService.show(error, { cssClass: 'alert-danger', timeout: 3000 });
                    this.loading = false;
                });
    }

}

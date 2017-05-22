/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment/moment';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
    model: any = {};

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // this.authenticationService.userRole;
    }

}

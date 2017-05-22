/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit, Compiler } from '@angular/core';
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
    userRole: string;

    constructor(
        private _compiler: Compiler,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // Clear cash https://stackoverflow.com/questions/34808023/how-to-clear-template-cache
        this._compiler.clearCache();
        // Get user role
        this.userRole = this.authenticationService.userRole;
    }

}

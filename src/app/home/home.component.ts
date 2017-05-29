/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit, Compiler } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment/moment';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { StatisticsService } from '../services/statistics.service';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';


@Component({
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
    userRole: string;
    statistics: Statistics;
    user: User;

    // User Token
    private token = JSON.parse(localStorage.getItem('currentUser')).token;

    constructor(
        private _compiler: Compiler,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private statisticsService: StatisticsService,
    ) { }

    // Set current status for user
    setCurrentUserStatus(user_id: number, status_id: number): any {
        return this.statisticsService.setCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }


    ngOnInit() {
        // Clear cashe https://stackoverflow.com/questions/34808023/how-to-clear-template-cache
        this._compiler.clearCache();
        // Get user role
        this.userRole = this.authenticationService.userRole;
    }

}

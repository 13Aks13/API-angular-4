/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses } from '../models/userstatuses';


import { UserService } from '../services/user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
    user: User;
    users: User[] = [];
    statistics: Statistics;
//    statisticses: Statistics[] = [];
    userstatuses: UserStatuses[] = [];

    selectedStatuses: UserStatuses;

    private Interval: any;
    private statusID: any;
    private staTime: any;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    // Get User by ID
    getUser(id: number): void {
        this.userService.getUser(id)
            .then(user => this.user = user);
    }

    // Get user statuses
    getStatuses(): any {
        return this.userService.getStatuses()
            .then(userstatuses => this.userstatuses = userstatuses);
    }

    getCurrentUserStatus(id: number): any {
        return this.userService.getCurrentUserStatus(id)
            .then(statistics => this.statistics = statistics);
    }

    setCurrentUserStatus(): any {
        return this.userService.setCurrentUserStatus(this.user.id, this.selectedStatuses.status_id)
            .then(statistics => this.statistics = statistics);
    }

    updCurrentUserStatus(user_id: number, status_id: number): any {
        return this.userService.updCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    getTime(user_id: number, status_id: number): any {
        return this.userService.getTime(user_id, status_id)
            .then(staTime => this.staTime = staTime);
    }

    ngOnInit() {
        // User Id
        let id = JSON.parse(localStorage.getItem('currentUser')).id;

        // Get user statuses
        this.getStatuses().then(() => {
            // Get user by ID
            this.getUser(id);
            // Current status
            this.getCurrentUserStatus(id).then(() => {
                // Fast filter for array
                this.statusID = this.statistics.status_id;
                let st = this.statusID;
                this.statistics.status_name = this.userstatuses.filter(function(obj) {
                     return obj.status_id === st;
                })[0].status_name;

                // Start update user status every X interval
                this.Interval = setInterval(() => {

                    for

                    this.updCurrentUserStatus(id, this.statusID);
                }, 20000);
            });
        });
    }

    ngOnDestroy() {
    //    clearInterval();
    }

    onSelect(userstatus: UserStatuses): void {
        let id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.selectedStatuses = userstatus;
        this.setCurrentUserStatus().then(() => {
            clearInterval(this.Interval);
            this.getCurrentUserStatus(id).then(() => {
                // Fast filter for array
                this.statusID = this.statistics.status_id;
                let st = this.statusID;
                this.statistics.status_name = this.userstatuses.filter(function(obj) {
                    return obj.status_id === st;
                })[0].status_name;

                // Start update user status every X interval
                this.Interval = setInterval(() => {
                    this.updCurrentUserStatus(id, this.statusID);
                }, 20000);

            });
            this.getUser(id);
        });
    }

}

/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses } from '../models/userstatuses';
import { Time } from '../models/time';

import { UserService } from '../services/user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment/moment';

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
    time: Time;

    selectedStatuses: UserStatuses;

    private Interval: any;
    private statusID: any;

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

    setCurrentUserStatus(user_id: number, status_id: number): any {
        return this.userService.setCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    updCurrentUserStatus(user_id: number, status_id: number): any {
        return this.userService.updCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    getTime(user_id: number, status_id: number): any {
        return this.userService.getTime(user_id, status_id)
            .then(time => this.time = time);
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

                // Get last user status and check it to today
                if (this.statistics.added !== moment().format('YYYY-MM-DD')) {
                    // Set default status offline for new day
                    this.setCurrentUserStatus(id, 1).then(() => {
                        this.getCurrentUserStatus(id).then(() => {
                            // Fast filter for array
                            this.statusID = this.statistics.status_id;
                            let st0 = this.statusID;
                            this.statistics.status_name = this.userstatuses.filter(function (obj) {
                                return obj.status_id === st0;
                            })[0].status_name;
                        });
                    });
                }

                // Start update user status every X interval
                this.Interval = setInterval(() => {
                    for (let i = 0; i < this.userstatuses.length; i++) {
                        this.getTime(id, this.userstatuses[i].status_id)
                            .then(() => {
                                switch (this.time.status_id) {
                                    case 1: this.user.offline =  this.time.seconds;
                                      break;
                                    case 2:  this.user.checkin =  this.time.seconds;
                                        break;
                                    case 3: this.user.lunche =  this.time.seconds;
                                        break;
                                    case 4: this.user.brake =  this.time.seconds;
                                        break;
                                    case 5: this.user.call =  this.time.seconds;
                                        break;
                                   }
                                // console.log(this.time);
                                console.log(this.user);
                            });
                    }

                    this.updCurrentUserStatus(id, this.statusID);
                }, 40000);
            });
        });
    }

    onSelect(userstatus: UserStatuses): void {
        let id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.selectedStatuses = userstatus;
        this.setCurrentUserStatus(id, this.selectedStatuses.status_id).then(() => {
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
                }, 40000);

            });
            this.getUser(id);
        });
    }

}

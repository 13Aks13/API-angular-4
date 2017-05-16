/**
 * Created by Andrew K. on 13.05.17.
 */

import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses } from '../models/userstatuses';
import { Time } from '../models/time';

import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { EventItem, EventService } from '../services/event.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment/moment';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
    user: User;
    statistics: Statistics;
    selectedStatuses: UserStatuses;
    userstatuses: UserStatuses[] = [];
    time: Time;

    private Interval: any;
    private statusID: any;
    private token: string;
    private model: EventItem[];

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private eventService: EventService
    ) { this.model = eventService.list(); }

    // Add event to list
    add(id: number, value: string) {
        this.eventService.add(new EventItem(id, value, false));
    }

    // Get user by token
    getUserByToken(token: string): any {
        this.userService.getUserByToken(token)
            .then( response => this.user = response );
    }

    // Get user statuses
    getStatuses(token: string): any {
        return this.userService.getStatuses(token)
            .then(userstatuses => this.userstatuses = userstatuses);
    }

    // Set current status for user
    setCurrentUserStatus(user_id: number, status_id: number): any {
        return this.userService.setCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    // Get current status for user
    getCurrentUserStatus(token: string, id: number): any {
        return this.userService.getCurrentUserStatus(token, id)
            .then(statistics => this.statistics = statistics);
    }

    // Update current user time in Interval
    updCurrentUserStatus(user_id: number, status_id: number): any {
        return this.userService.updCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    // Get time for current statuses
    getTime(user_id: number, status_id: number): any {
        return this.userService.getTime(user_id, status_id)
            .then(time => this.time = time);
    }


    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        // Get current user
        this.getUserByToken(this.token);
        // Get all valid statuses
        this.userService.getStatuses(this.token).then((userstatuses) => {
            this.userstatuses = userstatuses;
            // Kill Interval
            clearInterval(this.Interval);
            // Start update user status every X interval
            this.Interval = setInterval(() => {
                this.getCurrentUserStatus(this.token, this.user.id).then((statistics) => {
                    this.statistics = statistics;
                    this.userService.updCurrentUserStatus(this.user.id, this.statistics.status_id).then((response) => {
                        for (let i = 0; i < this.userstatuses.length; i++) {
                            this.getTime(this.user.id, this.userstatuses[i].status_id)
                                .then(() => {
                                    switch (this.time.status_id) {
                                        case 2:  this.user.today =  this.time.seconds;
                                            break;
                                        case 3:  this.user.brake =  this.time.seconds;
                                            break;
                                        case 4:  this.user.lunch =  this.time.seconds;
                                            break;
                                    }
                                    // console.log(this.time);
                                });
                        }
                    });
                });
            }, 5000);
        });
    }

    ngOnDestroy() {
        clearInterval(this.Interval);
    }

    onSelect(userstatus: UserStatuses): void {
        this.selectedStatuses = userstatus;
        // Set current status for user
        this.setCurrentUserStatus(this.user.id, this.selectedStatuses.status_id).then(() => {
            clearInterval(this.Interval);
            this.getCurrentUserStatus(this.token, this.user.id).then(() => {
                // Fast filter for array
                const st = this.statistics.status_id;
                this.statistics.status_name = this.userstatuses.filter(function(obj) {
                    return obj.status_id === st;
                })[0].status_name;

                // Send status to Nav
                this.add(this.statistics.status_id, this.statistics.status_name);

                // Start update user status every X interval
                this.Interval = setInterval(() => {
                    this.updCurrentUserStatus(this.user.id, this.statistics.status_id);
                        for (let i = 0; i < this.userstatuses.length; i++) {
                            this.getTime(this.user.id, this.userstatuses[i].status_id)
                                .then(() => {
                                    switch (this.time.status_id) {
                                        case 2:
                                            this.user.today = this.time.seconds;
                                            break;
                                        case 3:
                                            this.user.brake = this.time.seconds;
                                            break;
                                        case 4:
                                            this.user.lunch = this.time.seconds;
                                            break;
                                    }
                                    // console.log(this.time);
                                    // console.log(this.user);
                                });
                        }
                }, 5000);

            });
        });
    }

}

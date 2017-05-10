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

    ngOnInit() {
        // Get user statuses
        this.getStatuses().then(() => {
            console.log(this.userstatuses);
            // User Id
            let id = JSON.parse(localStorage.getItem('currentUser')).id;
            // Current status
            this.getCurrentUserStatus(id).then(() => {
                // to do -> to underscore
                for (let i = 0; i < this.userstatuses.length; i++) {
                    if (this.userstatuses[i].status_id === this.statistics.status_id) {
                        this.statistics.status_name =  this.userstatuses[i].status_name
                    };
                }
                // User ID
                this.getUser(id);
            });
        });

    }

    onSelect(userstatus: UserStatuses): void {
        let id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.selectedStatuses = userstatus;
        this.setCurrentUserStatus().then(() => {
            console.log(this.statistics.status_id);
        });
        this.getCurrentUserStatus(id);
        this.getUser(id);
    }

}

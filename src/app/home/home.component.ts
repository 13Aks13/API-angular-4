/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { UserStatus } from '../models/UserStatus';
import { UserStatuses } from '../models/userstatuses';


import { UserService } from '../services/user.service';


import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
    user: User;
//    users: User[] = [];

    us: UserStatus;

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
    getUsersStatuses(): void {
        this.userService.getUserStatuses()
            .then(userstatuses => this.userstatuses = userstatuses);
    }

    setCurrentUserStatus(): void {
        this.userService.setUserStatus(this.user.id, this.selectedStatuses.status_id)
            .then(us => this.us = us);
    }

    ngOnInit() {
        // Get user statuses
        this.getUsersStatuses();

        // User ID
        let id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.getUser(id);
    }

    onSelect(userstatus: UserStatuses): void {
        this.selectedStatuses = userstatus;
        this.setCurrentUserStatus();
        let id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.getUser(id);
    }

}

/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user';
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
    users: User[] = [];

//  userstatus: UserStatuses;
    userstatuses: UserStatuses[] = [];

    selectedStatuses: UserStatuses;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    // Get User by ID
    getUser(id: number): void {
        // Get user data
        this.userService.getUser(id)
            .then(user => this.user = user);
    }

    // Get user statuses
    getUsersStatuses(): void {

        this.userService.getUserStatuses()
            .then(userstatuses => this.userstatuses = userstatuses);
    }


    ngOnInit() {
        // Get user statuses
        this.getUsersStatuses();

        // User ID
        let id = JSON.parse(localStorage.getItem('currentUser')).id;

        this.getUser(id);
    }

    onSelect(userstatus: UserStatuses): void {
        console.log(userstatus);
        this.selectedStatuses = userstatus;
    }

    // setStatus(): void {
    //     console.log('User:' + this.user.id );
    //     console.log('Status:' + this.selectedStatuses.status_id);
    // }
}

/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../models/user';
import { UserStatuses } from '../models/userstatuses';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    user: User;
//    users: User[] = [];

//    userstatus: UserStatuses;
    userstatuses: UserStatuses[] = [];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        // Get user statuses
        this.userService.getUserStatuses()
            .then(userstatuses => this.userstatuses = userstatuses);

        // User ID
        let id = JSON.parse(localStorage.getItem('currentUser')).id;

        // Set user status
        // console.log(this.userstatuses);
        // this.userService.setUserStatusOnline()

        // Get user data
        this.userService.getUser(id)
            .then(user => this.user = user);

    }

}

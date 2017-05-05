/**
 * Created by Andrew K. on 04.05.17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    user: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {



        let id  = JSON.parse(localStorage.getItem('currentUser')).id;

        this.userService.getUser(id)
            .then(user => this.user = user);
    }

}
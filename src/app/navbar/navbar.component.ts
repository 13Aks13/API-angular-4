/**
 * Created by Andrew K. on 15.05.17.
 */

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses} from '../models/userstatuses';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { StatisticsService } from '../services/statistics.service';
import { EventItem, EventService } from '../services/event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    user: User;
    statistics: Statistics;
    userstatuses: UserStatuses;

    private Interval: any;

    // User Token
    private token = JSON.parse(localStorage.getItem('currentUser')).token;
    private addedItem: EventItem;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private statisticsService: StatisticsService,
        private eventService: EventService
    ) {
        eventService.itemAdded$.subscribe(item => this.onItemAdded(item));
    }

    private onItemAdded(item: EventItem): void {
        // do something with added item
        this.addedItem = item;
        this.statistics.status_id = this.addedItem.id;
        this.statistics.status_name = this.addedItem.name;
        // Start global status
        // this.globalStatus(this.statistics.status_id, this.statistics.status_name);
    }

    // Get current user status
    getCurrentUserStatus(token: string, id: number): any {
    return this.statisticsService.getCurrentUserStatus(token, id)
        .then(statistics => this.statistics = statistics);
    }

    // Set current status for user
    setCurrentUserStatus(user_id: number, status_id: number): any {
        return this.statisticsService.setCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    // Update current user time in Interval
    updCurrentUserStatus(user_id: number, status_id: number): any {
        return this.statisticsService.updCurrentUserStatus(user_id, status_id)
            .then(statistics => this.statistics = statistics);
    }

    ngOnInit() {
        // Get user by token
        this.userService.getUserByToken(this.token).then( (user) => {
            this.user = user;
            // Get current user status
            this.statisticsService.getCurrentUserStatus(this.token, this.user.id).then((statistics) => {
                this.statistics = statistics;
                // Get status name
                this.statisticsService.getStatusName(this.token, this.statistics.status_id).then((userstatuses) => {
                    this.userstatuses = userstatuses;
                    this.statistics.status_name = this.userstatuses.status_name;
                });
            });
        });
    }

    logout() {
        console.log('Logout');
        // Get user by token
        this.userService.getUserByToken(this.token).then( (user) => {
            this.user = user;
            // Get current user status
            this.statisticsService.getCurrentUserStatus(this.token, this.user.id).then((statistics) => {
                this.statistics = statistics;
                console.log(this.statistics);
                if (this.statistics.id !== 1) {
                    this.setCurrentUserStatus(this.user.id, 1);
                    this.authenticationService.logout();
                } else {
                    this.authenticationService.logout();
                }
            });
        });
    }

}

/**
 * Created by Andrew K. on 15.05.17.
 */

import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses} from '../models/userstatuses';
import { UserService } from '../services/user.service';
import { StatisticsService } from '../services/statistics.service';
import { EventItem, EventService } from '../services/event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    user: User;
    statistics: Statistics;
    userstatuses: UserStatuses;

    private Interval: any;

    // User Token
    private token = JSON.parse(localStorage.getItem('currentUser')).token;
    private addedItem: EventItem;

    constructor(
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
                console.log('Nav bar user status:', this.statistics);
                // Get status name
                this.statisticsService.getStatusName(this.token, this.statistics.status_id).then((userstatuses) => {
                    this.userstatuses = userstatuses;
                    this.statistics.status_name = this.userstatuses.status_name;
                });
            });
        });
    }

    // // G(S)et user status
    // globalStatus(id, name) {
    //     if ((id !== 1) && (id !== undefined)) {
    //         // Kill Interval
    //         clearInterval(this.Interval);
    //         // Start update user status every X interval
    //         this.Interval = setInterval(() => {
    //             this.statisticsService.updCurrentUserStatus(this.user.id, this.statistics.status_id).then((response) => {
    //                 console.log('Global status upd: ', response.seconds);
    //             });
    //         }, 10000);
    //
    //     }
    // }

    ngOnDestroy() {

    }

    // ngOnDestroy() {
    //     clearInterval(this.Interval);
    //     this.statisticsService.getCurrentUserStatus(this.token, this.user.id).then((statistics) => {
    //         this.statistics = statistics;
    //         if (this.statistics.status_id !== 1) {
    //             // Send status offline to API
    //             this.setCurrentUserStatus(this.user.id, 1);
    //         }
    //     });
    // }

}

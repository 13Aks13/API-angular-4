/**
 * Created by Andrew K. on 15.05.17.
 */

import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses} from '../models/userstatuses';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  statistics: Statistics;
  userstatuses: UserStatuses;

  // User Token
  private token = JSON.parse(localStorage.getItem('currentUser')).token;

  constructor(
      private userService: UserService
  ) { }

  // Get current user status
  getCurrentUserStatus(token: string, id: number): any {
    return this.userService.getCurrentUserStatus(token, id)
        .then(statistics => this.statistics = statistics);
  }

  setStatus(event: object) {
    console.log(event);
  }

  ngOnInit() {
    // Get user by token
    this.userService.getUserByToken(this.token).then( (user) => {
        this.user = user;
        // Get current user status
        this.userService.getCurrentUserStatus(this.token, this.user.id).then((statistics) => {
            this.statistics = statistics;
            // Get status name
            this.userService.getStatusName(this.token, this.statistics.status_id).then((userstatuses) => {
                this.userstatuses = userstatuses;
                this.statistics.status_name = this.userstatuses.status_name;
            });
        });
    });
  }

  ngOnDestroy() {

  }

}

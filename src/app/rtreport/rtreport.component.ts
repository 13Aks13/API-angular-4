import { Component, OnInit, OnDestroy, Compiler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Rx';


// Ngx section
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import '@swimlane/ngx-datatable/release/index.css';
import '@swimlane/ngx-datatable/release/themes/material.css';
import '@swimlane/ngx-datatable/release/assets/icons.css';
// http://swimlane.github.io/ngx-datatable/


// Service
import { RtreportService } from '../services/rtreport.service';
import { UserService } from '../services/user.service';
import { StatisticsService } from '../services/statistics.service';
import { AuthenticationService } from '../services/authentication.service';
// Models
import { Rtreport } from '../models/rtreport';
import { User } from '../models/user';
import { UserStatuses } from '../models/userstatuses';
import { Statistics } from '../models/statistics';
import {ifTrue} from "codelyzer/util/function";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-rtreport',
  templateUrl: './rtreport.component.html',
  styleUrls: ['./rtreport.component.css']
})
export class RtreportComponent implements OnInit {

    // URLs to web api
    private domain = this.authenticationService.domain;
    private statusUrl = 'status';

    users: User[] = [];
    statuses: UserStatuses[] = [];

    row: object = {};
    a: Array<object> = [];

    rows: Observable<any[]>;

    private Interval: any;
    private token: string;

    columns = [
        { prop: 'status' },
        { prop: 'name' },
        { prop: 'Check In' },
        { prop: 'Lunch' },
        { prop: 'Break' },
    ];

    constructor(
        private _compiler: Compiler,
        private router: Router,
        private rtreportService: RtreportService,
        private userService: UserService,
        private statisticsServices: StatisticsService,
        private authenticationService: AuthenticationService
    ) {

    }

    findStatus(id: number): any {
        return this.users.filter(function (obj) {
            return obj.id === id;
        } [0].name);
    }


    // self.http.get(url)
    //     .map(res => res.json())
    //     .subscribe(
    //         data => {
    //             console.log(data);
    //         },
    //         error => {}
    //     );

    ngOnInit() {
        // Load data from API
        this.getData();
        // Kill Interval
        clearInterval(this.Interval);
        // Start update user status every X interval
        this.Interval = setInterval(() => {
            // Clear cache
            this._compiler.clearCache();
            // https://stackoverflow.com/questions/39396075/how-to-reload-the-component-of-same-url-in-angular-2
            this.a = [];
            this.router.navigateByUrl('/realtime', true);
            this.router.navigate(['/realtime']);
            // window.location.reload();
            // Update data in table
            this.getData();
        }, 15000);
    }

    getData(): void {
        this.token = this.authenticationService.token;
        const self = this;
        this.userService.getUsers().then((user) => {
            this.users = user;
            // All statuses
            this.statisticsServices.getStatuses(this.token).then((status) => {
                this.statuses = status;
                this.rtreportService.getAllStatuses(this.token).then((res) => {
                    const result = JSON.parse(res._body);
                    let promises = [];
                    for (let userId in result) {
                        // Objec data
                        let inObj = result[userId];
                        // Convert String to Int
                        const key = +userId;

                        // This need for Async get data
                        let promise = new Promise((resolve, reject) => {
                            // User current status
                            self.statisticsServices.getCurrentUserStatus(self.token, key).then((rest) => {
                                self.row['status'] = self.statuses.filter(function(obj) {
                                    return obj.status_id === rest.status_id;
                                })[0].status_name;

                                // const stName =  self.row['status'];
                                let Name = self.users.filter(function(obj) {
                                    return obj.id === key;
                                })[0].first_name;

                                Name = Name + ' ' + self.users.filter(function(obj) {
                                    return obj.id === key;
                                })[0].last_name;

                                self.row['name'] = Name;

                                // if (stName !== 'Check Out') {
                                //
                                // }

                                for (let prop in inObj) {
                                    const propStatusId = +prop;
                                    const propName = self.statuses.filter(function(obj) {
                                        return obj.status_id === propStatusId;
                                    })[0].status_name;

                                    self.row[propName] = inObj[prop];
                                }

                                // self.a.push(self.row);
                                // console.log(self.a.length);
                                // self.row = {};
                                const row = self.row;
                                resolve(row);
                                self.row = {};
                            });
                        });
                        promises.push(promise);
                    }
                    Promise.all(promises).then(results => {
                        // console.log(results);
                        this.rows = Observable.create((subscriber) => {
                            subscriber.next(results);
                            //subscriber.complete();
                        });
                    });

                });

            });
        });
    }

    ngOnDestroy() {
        clearInterval(this.Interval);
    }
}

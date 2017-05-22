import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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
    rtreports: Rtreport[] = [];
    statistics: Statistics;

    row: object = {};
    a: any = [];

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
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private platformLocation: PlatformLocation,
        private ngZone: NgZone,
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

    ngOnInit() {
        // Kill Interval
        // clearInterval(this.Interval);

        this.token = this.authenticationService.token;
        const self = this;
        this.userService.getUsers().then((user) => {
            this.users = user;
            // All statuses
            this.statisticsServices.getStatuses(this.token).then((status) => {
                this.statuses = status;

                this.rtreportService.getAllStatuses(this.token).then((res) => {
                    const result = JSON.parse(res._body);
                    for (let userId in result) {
                        let inObj = result[userId];

                        const key = +userId;
                        // self.http.get(url)
                        //     .map(res => res.json())
                        //     .subscribe(
                        //         data => {
                        //             console.log(data);
                        //         },
                        //         error => {}
                        //     );

                        self.statisticsServices.getCurrentUserStatus(self.token, key).then((rest) => {
                            self.row['status'] = self.statuses.filter(function(obj) {
                                return obj.status_id === rest.status_id;
                            })[0].status_name;


                            const stName = self.users.filter(function(obj) {
                                    return obj.id === key;
                                })[0].name;
                            if (stName !== 'Check Out') {
                                self.row['name'] = stName;
                            }

                            for (let prop in inObj) {
                                const propStatusId = +prop;
                                const propName = self.statuses.filter(function(obj) {
                                    return obj.status_id === propStatusId;
                                })[0].status_name;

                                self.row[propName] = inObj[prop];
                            }
                            console.log(self.row);
                            self.a.push(self.row);
                            self.row = {};
                        });


                    }
                    console.log(this.a);
                    this.rows = Observable.create((subscriber) => {
                        subscriber.next(this.a);
                        subscriber.complete();
                    });
                });

            });
        });
        // Start update user status every X interval
        this.Interval = setInterval(() => {
            console.log('Reload');
            this.router.navigate(['/realtime']);

            // this.platformLocation.onPopState(() => {
            //     console.log('Reload');
            //     if (this.platformLocation.pathname.startsWith('/realtime')) {
            //         this.ngZone.run(() => {
            //             console.log('Reloading component');
            //         });
            //     }
            // });

        }, 15000);
    }

    ngOnDestroy() {
        clearInterval(this.Interval);
    }
}

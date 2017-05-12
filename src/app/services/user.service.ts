/**
 * Created by Andrew K. on 04.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/moment';


import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { Statistics } from '../models/statistics';
import { UserStatuses } from '../models/userstatuses';
import { Time } from '../models/time';


@Injectable()
export class UserService {

    // URL to web api
    private domain = 'http://ws.dev/';
    // private domain = 'http://wsapi.test-y-sbm.com/';
    private registerUrl = 'register';
    private userUrl = 'users';
    private statusUrl = 'status';
    private statusesUrl = 'statuses';
    private timeUrl = 'time';


    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    create(user: User): Promise<User> {
        const url = `${this.domain}${this.registerUrl}`;
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json().data as User)
            .catch(this.handleError);
    }

    getUser(id: number): Promise<User> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.userUrl}/${id}`;

        // get user by id
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as User)
            .catch(this.handleError);
    }
/*
    getUsers(): Promise<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.userUrl}`;

        // get users from api
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError);
    }
*/
    getStatuses(): Promise<UserStatuses[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusesUrl}`;

        // get user statuses from api
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as UserStatuses[])
            .catch(this.handleError);
    }

    getCurrentUserStatus(user_id: number): Promise<Statistics> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}?user_id=${user_id}` ;

        // get user current status from Statistic
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    setCurrentUserStatus(user_id: number, status_id: number): Promise<Statistics> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}`;

        // set user statuses for api
        return this.http.post(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    updCurrentUserStatus(user_id: number, status_id: number): Promise<Statistics> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}`;

        // set user statuses for api
        return this.http.put(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    getTime(user_id: number, status_id: number): Promise<Time> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.timeUrl}`;

        let start =  moment().format('YYYY-MM-DD') + ' ' + '00:00:00' ;
        let end = moment().format('YYYY-MM-DD') + ' ' + '23:59:59';

        return this.http.post(url, { user_id: user_id, status_id: status_id, 'start': start, 'end': end }, options)
            .toPromise()
            .then(response => (response.json() as Time))
            .catch(this.handleError);
    }

}

/**
 * Created by Andrew K. on 04.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
    private usersUrl = 'users';
    private statusUrl = 'status';
    private statusnameUrl = 'statusname';
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

    getUserByToken(token: string): Promise<User>  {
        // token
        const url = `${this.domain}${this.usersUrl}/me?token=${token}`;

        // get user by token
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as User)
            .catch(this.handleError);
    }

    getUser(id: number): Promise<User> {
        // add authorization header with jwt token
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.usersUrl}/${id}`;

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
    getStatuses(token: string): Promise<UserStatuses[]> {
        const url = `${this.domain}${this.statusesUrl}?token=${token}`;

        // get user statuses from api
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as UserStatuses[])
            .catch(this.handleError);
    }

    getCurrentUserStatus(token: string, user_id: number): Promise<Statistics> {
        const url = `${this.domain}${this.statusUrl}?token=${token}&user_id=${user_id}` ;

        // get user current status from Statistic
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    setCurrentUserStatus(user_id: number, status_id: number): Promise<Statistics> {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}`;

        // set user statuses for api
        return this.http.post(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    updCurrentUserStatus(user_id: number, status_id: number): Promise<Statistics> {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}`;

        // set user statuses for api
        return this.http.put(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(response => response.json().data as Statistics)
            .catch(this.handleError);
    }

    getTime(user_id: number, status_id: number): Promise<Time> {
        const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.timeUrl}`;

        const start =  moment().format('YYYY-MM-DD') + ' ' + '00:00:00' ;
        const end = moment().format('YYYY-MM-DD') + ' ' + '23:59:59';

        return this.http.post(url, { user_id: user_id, status_id: status_id, 'start': start, 'end': end }, options)
            .toPromise()
            .then(response => (response.json() as Time))
            .catch(this.handleError);
    }

    getStatusName(token: string, id: number): Promise<UserStatuses> {
        const url = `${this.domain}${this.statusnameUrl}?token=${token}&id=${id}` ;

        // get user current status from Statistic
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as UserStatuses)
            .catch(this.handleError);
    }

}

/**
 * Created by Andrew K. on 04.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { UserStatus } from '../models/UserStatus';
import { UserStatuses } from '../models/userstatuses';


@Injectable()
export class UserService {

    // URL to web api
    private domain = 'http://ws.dev/';
    private userUrl = 'users';
    private statusUrl = 'changestatus';


    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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

    getUserStatuses(): Promise<UserStatuses[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}statuses`;

        // get user statuses from api
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as UserStatuses[])
            .catch(this.handleError);
    }

    setUserStatus(user_id: number, status_id: number): Promise<UserStatus> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}`;

         // set user statuses for api
        return this.http.post(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(response => response.json() as UserStatus)
            .catch(this.handleError);
    }

    getUserStatus(user_id: number): Promise<UserStatus> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.statusUrl}/${user_id}`;

        // set user statuses for api
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as UserStatus)
            .catch(this.handleError);
    }


}

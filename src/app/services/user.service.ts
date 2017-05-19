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


@Injectable()
export class UserService {

    // URLs to web api
    private domain = this.authenticationService.domain;
    private registerUrl = 'register';
    private usersUrl = 'users';

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

    // Get all users
    getUsers(): Promise<User[]> {
        // add authorization header with jwt token
        const token = this.authenticationService.token;
        const url = `${this.domain}${this.usersUrl}?token=${token}`;

        // get users from api
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError);
    }

}

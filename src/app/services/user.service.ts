/**
 * Created by Andrew K. on 04.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

    // URL to web api
    private userUrl = 'http://ws.dev/users';

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUser(id: number): Promise<User> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.userUrl}/${id}`;
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as User)
            .catch(this.handleError);
    }

    getUsers(): Promise<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.userUrl}`;
        // get users from api
        return this.http.get(url, options)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

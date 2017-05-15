/**
 * Created by Andrew K. on 04.05.17.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthenticationService {

    public token: string;

    // URL to web api
    private domain = 'http://ws.dev/';
    // private domain = 'http://wsapi.test-y-sbm.com/';
    private loginUrl = 'login';

    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string) {
        const headers = new Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        const url = `${this.domain}${this.loginUrl}`;

        return this.http.post(url, JSON.stringify({ email: email, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.token = user.token;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}

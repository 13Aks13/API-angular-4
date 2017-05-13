/**
 * Created by Andrew K. on 04.05.17.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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

        const url = `${this.domain}${this.loginUrl}`;

        return this.http.post(url, JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }


    // login(email: string, password: string): Promise<any> {
    //
    //     const url = `${this.domain}${this.loginUrl}`;
    //
    //     return this.http.post(url, JSON.stringify({email: email, password: password}))
    //         .toPromise()
    //         .then(response => {
    //             const token = JSON.parse(response.text()).token;
    //             const id = JSON.parse(response.text()).user.id;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;
    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token, id: id }));
    //                 // get token true
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         })
    //         .catch(this.handleError);
    // };

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

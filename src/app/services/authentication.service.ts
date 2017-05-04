/**
 * Created by Andrew K. on 04.05.17.
 *
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthenticationService {

    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }


    login(email: string, password: string): Promise<any> {
        console.log(email);
        console.log(password);
        let url = 'http://ws.dev/authenticate';

        return this.http.post(url, JSON.stringify({email: email, password: password}))
            .toPromise()
            .then(response => {
                let token = JSON.parse(response.text()).token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({email: email, token: token}));
                    // get token true
                    return true;
                } else {
                    return false;
                }
            })
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
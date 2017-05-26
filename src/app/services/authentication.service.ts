/**
 * Created by Andrew K. on 04.05.17.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


// Models
import { User } from '../models/user';


@Injectable()
export class AuthenticationService {

    public token: string;
    public userRole: string;

    // ENV file
    public env: string;
    // Domain
    public domain: string;

    private loginUrl = 'login';
    private usersUrl = 'users';

    constructor(
        private http: Http,
        private router: Router,
    ) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string) {
        const headers = new Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.loginUrl}`;

        // console.log('JSON.stringify:', JSON.stringify({ email: email, password: password }));

        return this.http.post(url, { email: email, password: password }, options)
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
        this.userRole = null;
        localStorage.removeItem('currentUser');
    }

    setUserRole(role) {
        this.userRole = role;
    }

    getUserRole(): Observable<User> {
        return new Observable(observer => {
            if (this.userRole) {
                console.log('Role was gotten from service: ',  this.userRole);
                observer.next(this.userRole);
            } else {
                const url = `${this.domain}${this.usersUrl}/me?token=${this.token}`;

                this.http.get(url)
                    .map(res => res.json().data as User)
                    .subscribe(
                        User => {
                            console.log('Role was gotten from server: ', User.role.title);
                            this.setUserRole(User.role.title);
                            observer.next(User.role);
                        },
                        error => {
                            console.log('Can`t get user role', error);
                            observer.next(false);
                        }
                    );
            }
        });
    }

}

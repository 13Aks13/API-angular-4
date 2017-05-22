/**
 * Created by Andrew K. on 04.05.17.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// Models
import { User } from '../models/user';


@Injectable()
export class AuthenticationService {

    public token: string;
    public userRole: string;

    // URL to web api
    public domain = 'http://ws.dev/';
    // public domain = 'http://wsapi.test-y-sbm.com/';
    private loginUrl = 'login';
    private usersUrl = 'users';

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

    setUserRole(role) {
        this.userRole = role;
    }

    getUserRole(): Observable<User> {
        return new Observable(observer => {
            if (this.userRole) {
                console.log('Role was gotten from service:' + this.userRole);
                observer.next(this.userRole);
            } else {
                const url = `${this.domain}${this.usersUrl}/me?token=${this.token}`;

                this.http.get(url)
                    .map(res => res.json().data as User)
                    .subscribe(
                        User => {
                            console.log('Role was gotten from server:' + User.role.title);
                            this.setUserRole(User.role.title);
                            observer.next(User.role);
                        },
                        error => {
                            console.log('Can`t get user role', error);
                        }
                    );
            }
        });
    }

}

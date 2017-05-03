/**
 * Created by adreik on 28.04.17.
 */
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]

})

export class LoginComponent {
//    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    public token: string;
    public email: string;
    public password: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }


     login(): Promise<any> {
        console.log(this.email);
        console.log(this.password);
        let url = 'http://ws.dev/authenticate';

        return this.http.post(url, JSON.stringify({email: this.email, password: this.password}))
            .toPromise()
            .then(res => {
                let token = JSON.parse(res.text()).token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({email: this.email, token: token}));
                }
            })
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}

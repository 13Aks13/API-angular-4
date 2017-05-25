/**
 * Created by Andrew K. on 25.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/moment';

import { AuthenticationService } from './authentication.service';
import { Location } from '../models/location';


@Injectable()
export class LocationService {
    // URLs to web api
    private domain = this.authenticationService.domain;
    private locationUrl = 'location';

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getLocations(token: string): Promise<Location[]> {
        const url = `${this.domain}${this.locationUrl}?token=${token}`;
        // get user statuses from api
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Location[])
            .catch(this.handleError);
    }

}


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/moment';

// Service
import { AuthenticationService } from './authentication.service';

// Models
import { Rtreport } from '../models/rtreport';

@Injectable()
export class RtreportService {

    // URLs to web api
    private domain = this.authenticationService.domain;
    private rtreportUrl = 'rtreport';

    constructor(
      private http: Http,
      private authenticationService: AuthenticationService
    ) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getAllStatuses(token: string): Promise<any> {
        // Current date
        const start =  moment().format('YYYY-MM-DD') + ' ' + '00:00:00' ;
        const end = moment().format('YYYY-MM-DD') + ' ' + '23:59:59';

        const url = `${this.domain}${this.rtreportUrl}?token=${token}&start=${start}&end=${end}`;

        // get user statuses from api
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            // .then(response => { response.json(); console.log(response); })
            .catch(this.handleError);
    }

}

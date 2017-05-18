/**
 * Created by Andrew K. on 17.05.17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

// Services
import { AuthenticationService } from './authentication.service';
import { DailyReport } from '../models/dailyreport';

@Injectable()
export class DailyreportService {

    // URLs to web api
    private domain = this.authenticationService.domain;
    private reportUrl = 'report';

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    storeDailyReport(user_id: number, task_id: number, report: any): Promise<DailyReport> {
        // const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // const options = new RequestOptions({ headers: headers });
        const url = `${this.domain}${this.reportUrl}?token=${this.authenticationService.token}`;

        // return this.http.post(url, { user_id: user_id, report: report}, options)
        return this.http.post(url, { user_id: user_id, report: report})
            .toPromise()
            .then(response => (response.json() as DailyReport))
            .catch(this.handleError);
    }
}

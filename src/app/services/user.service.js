/**
 * Created by Andrew K. on 04.05.17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var moment = require("moment/moment");
var authentication_service_1 = require("./authentication.service");
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        // URL to web api
        this.domain = 'http://ws.dev/';
        // private domain = 'http://wsapi.test-y-sbm.com/';
        this.registerUrl = 'register';
        this.userUrl = 'users';
        this.statusUrl = 'status';
        this.statusesUrl = 'statuses';
        this.timeUrl = 'time';
    }
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    UserService.prototype.create = function (user) {
        var url = "" + this.domain + this.registerUrl;
        return this.http.post(url, user)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.userUrl + "/" + id;
        // get user by id
        return this.http.get(url, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    /*
        getUsers(): Promise<User[]> {
            // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });
            const url = `${this.domain}${this.userUrl}`;
    
            // get users from api
            return this.http.get(url, options)
                .toPromise()
                .then(response => response.json().data as User[])
                .catch(this.handleError);
        }
    */
    UserService.prototype.getStatuses = function () {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.statusesUrl;
        // get user statuses from api
        return this.http.get(url, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getCurrentUserStatus = function (user_id) {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.statusUrl + "?user_id=" + user_id;
        // get user current status from Statistic
        return this.http.get(url, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.setCurrentUserStatus = function (user_id, status_id) {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.statusUrl;
        // set user statuses for api
        return this.http.post(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.updCurrentUserStatus = function (user_id, status_id) {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.statusUrl;
        // set user statuses for api
        return this.http.put(url, { user_id: user_id, status_id: status_id }, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getTime = function (user_id, status_id) {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "" + this.domain + this.timeUrl;
        var start = moment().format('YYYY-MM-DD') + ' ' + '00:00:00';
        var end = moment().format('YYYY-MM-DD') + ' ' + '23:59:59';
        return this.http.post(url, { user_id: user_id, status_id: status_id, 'start': start, 'end': end }, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        authentication_service_1.AuthenticationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
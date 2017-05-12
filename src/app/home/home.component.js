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
var router_1 = require("@angular/router");
var user_service_1 = require("../services/user.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/switchMap");
var moment = require("moment/moment");
var HomeComponent = (function () {
    function HomeComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        this.users = [];
        //    statisticses: Statistics[] = [];
        this.userstatuses = [];
    }
    // Get User by ID
    HomeComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id)
            .then(function (user) { return _this.user = user; });
    };
    // Get user statuses
    HomeComponent.prototype.getStatuses = function () {
        var _this = this;
        return this.userService.getStatuses()
            .then(function (userstatuses) { return _this.userstatuses = userstatuses; });
    };
    HomeComponent.prototype.getCurrentUserStatus = function (id) {
        var _this = this;
        return this.userService.getCurrentUserStatus(id)
            .then(function (statistics) { return _this.statistics = statistics; });
    };
    HomeComponent.prototype.setCurrentUserStatus = function (user_id, status_id) {
        var _this = this;
        return this.userService.setCurrentUserStatus(user_id, status_id)
            .then(function (statistics) { return _this.statistics = statistics; });
    };
    HomeComponent.prototype.updCurrentUserStatus = function (user_id, status_id) {
        var _this = this;
        return this.userService.updCurrentUserStatus(user_id, status_id)
            .then(function (statistics) { return _this.statistics = statistics; });
    };
    HomeComponent.prototype.getTime = function (user_id, status_id) {
        var _this = this;
        return this.userService.getTime(user_id, status_id)
            .then(function (time) { return _this.time = time; });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // User Id
        var id = JSON.parse(localStorage.getItem('currentUser')).id;
        // Get user statuses
        this.getStatuses().then(function () {
            // Get user by ID
            _this.getUser(id);
            // Current status
            _this.getCurrentUserStatus(id).then(function () {
                // Fast filter for array
                var st = _this.statistics.status_id;
                _this.statistics.status_name = _this.userstatuses.filter(function (obj) {
                    return obj.status_id === st;
                })[0].status_name;
                // Get last user status and check it to today
                if (_this.statistics.added !== moment().format('YYYY-MM-DD')) {
                    // Set default status offline for new day
                    _this.setCurrentUserStatus(id, 1).then(function () {
                        _this.getCurrentUserStatus(id).then(function () {
                            // Fast filter for array
                            _this.statistics.status_name = _this.userstatuses.filter(function (obj) {
                                return obj.status_id === 1;
                            })[0].status_name;
                            console.log(_this.statistics.status_name);
                        });
                    });
                }
                // Start update user status every X interval
                _this.Interval = setInterval(function () {
                    for (var i = 0; i < _this.userstatuses.length; i++) {
                        _this.getTime(id, _this.userstatuses[i].status_id)
                            .then(function () {
                            switch (_this.time.status_id) {
                                case 1:
                                    _this.user.offline = _this.time.seconds;
                                    break;
                                case 2:
                                    _this.user.checkin = _this.time.seconds;
                                    break;
                                case 3:
                                    _this.user.lunche = _this.time.seconds;
                                    break;
                                case 4:
                                    _this.user.brake = _this.time.seconds;
                                    break;
                                case 5:
                                    _this.user.call = _this.time.seconds;
                                    break;
                            }
                            // console.log(this.time);
                            // console.log(this.user);
                        });
                    }
                    _this.updCurrentUserStatus(id, _this.statistics.status_id).then(function () {
                        _this.getCurrentUserStatus(id).then(function () {
                            // Fast filter for array
                            _this.statistics.status_name = _this.userstatuses.filter(function (obj) {
                                return obj.status_id === 1;
                            })[0].status_name;
                            console.log(_this.statistics.status_name);
                        });
                    });
                }, 60000);
            });
        });
    };
    HomeComponent.prototype.onSelect = function (userstatus) {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.selectedStatuses = userstatus;
        this.setCurrentUserStatus(id, this.selectedStatuses.status_id).then(function () {
            clearInterval(_this.Interval);
            _this.getCurrentUserStatus(id).then(function () {
                // Fast filter for array
                var st = _this.statistics.status_id;
                _this.statistics.status_name = _this.userstatuses.filter(function (obj) {
                    return obj.status_id === st;
                })[0].status_name;
                // Start update user status every X interval
                _this.Interval = setInterval(function () {
                    _this.updCurrentUserStatus(id, _this.statistics.status_id);
                }, 60000);
            });
            _this.getUser(id);
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
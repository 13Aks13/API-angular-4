/**
 * Created by Andrew K. on 04.05.17.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) { }

    canActivate(routes, state): Observable<boolean> | Promise<boolean> | boolean {
        const roles = routes.data['roles'];
        console.log('Required role: ', roles);

        return new Observable(observer => {
            this.authenticationService.getUserRole().subscribe(
                role => {
                    // console.log(this.authenticationService.userRole);
                    // logged in so return true
                    let hasPermission;
                    if ((this.authenticationService.userRole) && (role.title === undefined)) {
                        hasPermission = roles.indexOf(this.authenticationService.userRole) !== -1;
                    } else {
                        hasPermission = roles.indexOf(role.title) !== -1;
                    }

                    console.log('User role: ', role.title);
                    console.log('Has permission: ', hasPermission);
                    if (!hasPermission) {
                        this.alertService.error('Sorry, you don`t have permission to that page', false);
                        this.router.navigate(['/login']);
                    }
                    observer.next(hasPermission);
                },
                error => {
                    console.log(error);
                    observer.next(false);
                    // not logged in so redirect to login page
                    this.router.navigate(['/login']);
                    this.alertService.error('Please log in', false);
                }
            );
        });

        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     return true;
        // }
        //
        // // not logged in so redirect to login page
        // this.router.navigate(['/login']);
        // return false;
    }
}

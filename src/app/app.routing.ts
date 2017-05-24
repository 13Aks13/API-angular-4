/**
 * Created by Andrew K. on 04.05.17.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PolicyComponent } from './policy/policy.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AdminComponent } from './admin/admin.component';
import { TeamleadComponent } from './teamlead/teamlead.component';
import { RtreportComponent } from './rtreport/rtreport.component';

import { Roles } from './models/roles';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'policy',
                component: PolicyComponent
            },
        ],
        data: {
            'roles': [Roles.USER, Roles.TEAMLEAD, Roles.ADMIN]
        },
        canActivate: [AuthGuard],
    },

    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'teamlead',
                redirectTo: '/teamlead',
                pathMatch: 'full'
            },
            {
                path: 'teamlead',
                component: TeamleadComponent
            }
        ],
        data: {
            'roles': [Roles.TEAMLEAD, Roles.ADMIN]
        },
        canActivate: [AuthGuard],
    },

    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'admin',
                redirectTo: '/admin',
                pathMatch: 'full'
            },
            {
                path: 'admin',
                component: AdminComponent
            },
            {
                path: 'realtime',
                component: RtreportComponent
            },
        ],
        data: {
            'roles': [Roles.ADMIN]
        },
        canActivate: [AuthGuard],
    },


    // otherwise redirect to home
    // { path: '**', redirectTo: '' },
    { path: '404', component: PageNotFoundComponent  },
    { path: '**',    redirectTo: '/404'  }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

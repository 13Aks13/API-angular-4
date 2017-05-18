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

import { RtreportComponent } from './rtreport/rtreport.component';

const routes: Routes = [
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
            {
                path: 'realtime',
                component: RtreportComponent
            }
        ],
        canActivate: [AuthGuard],
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

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

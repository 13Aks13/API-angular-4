import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// Services
import { AuthGuard } from './services/auth.guard';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { StatisticsService } from './services/statistics.service';
import { DailyreportService } from './services/dailyreport.service';
import { RtreportService } from './services/rtreport.service';
import { EventItem, EventService } from './services/event.service';
import { ValidateService } from './services/validate.service';
import { LocationService } from './services/location.service';

// Components
import { AppConfig } from './config/app.config';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DailyReportComponent } from './dailyreport/dailyreport.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RtreportComponent } from './rtreport/rtreport.component';
import { PolicyComponent } from './policy/policy.component';
import { SafePipe } from './pipe/safe.pipe';
import { AdminComponent } from './admin/admin.component';
import { TeamleadComponent } from './teamlead/teamlead.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        AlertModule.forRoot(),
        FlashMessagesModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SafePipe,
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        NavbarComponent,
        DashboardComponent,
        DailyReportComponent,
        PageNotFoundComponent,
        RtreportComponent,
        PolicyComponent,
        AdminComponent,
        TeamleadComponent,
        ProfileComponent,
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        StatisticsService,
        DailyreportService,
        RtreportService,
        EventService,
        ValidateService,
        LocationService,
        AppConfig,
        { provide: APP_INITIALIZER,
            useFactory: initConfig, // And use it here
            deps: [AppConfig],
            multi: true
        }

    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }

export function initConfig(configApp: AppConfig) {
    return () => configApp.load();
}


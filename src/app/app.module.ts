import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Services
import { AuthGuard } from './services/auth.guard';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { StatisticsService } from './services/statistics.service';
import { DailyreportService } from './services/dailyreport.service';
import { RtreportService } from './services/rtreport.service';
import { EventItem, EventService } from './services/event.service';

// Components
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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    StatisticsService,
    DailyreportService,
    RtreportService,
    EventService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

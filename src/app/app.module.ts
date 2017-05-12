import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
// import { MomentModule }  from 'angular2-moment';
import { AppComponent }  from './app.component';
import { AppRoutingModule }  from './app.routing';


// Services
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';
import { AlertService } from './services/alert.service';

// Components
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
//      MomentModule,
      AppRoutingModule,
  ],
  declarations: [
      AppComponent,
      AlertComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

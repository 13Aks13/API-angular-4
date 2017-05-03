import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { HttpModule }     from '@angular/http';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

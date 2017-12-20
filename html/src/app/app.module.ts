import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AlertService, AuthenticationService, ApiCall, Session, LoaderService } from './_services/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,

  ],
  providers: [
    AlertService,
    AuthenticationService,
    ApiCall,
    Session,
    LoaderService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

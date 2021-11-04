import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ConfigurationService} from './core/services/api/configuration.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    RouterModule,
    ConfigurationService,
    {provide: Window, useValue: window},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {RouterModule} from '@angular/router';
import {ConfigurationService} from './core/services/api/configuration.service';
import {TableComponent} from './components/table/table.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormFieldComponent} from './components/form-field/form-field.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClientsComponent } from './components/clients/clients.component';

const MaterialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatSliderModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatMenuModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSidenavModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DashboardComponent,
    FormFieldComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
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

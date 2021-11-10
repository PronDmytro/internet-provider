import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ConfigurationService} from './core/services/api/configuration.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {ClientComponent} from './components/client/client.component';
import {OrderComponent} from './components/order/order.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ClientFormDialogComponent} from './components/client/client-form-dialog/client-form-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ClientTableComponent} from './components/client/client-table/client-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {ServiceComponent} from './components/service/service.component';
import {ServiceFormDialogComponent} from './components/service/service-form-dialog/service-form-dialog.component';
import {ServiceTableComponent} from './components/service/service-table/service-table.component';
import {PositionComponent} from './components/position/position.component';
import {PositionTableComponent} from './components/position/position-table/position-table.component';
import {PositionFormDialogComponent} from './components/position/position-form-dialog/position-form-dialog.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {EmployeeTableComponent} from './components/employee/employee-table/employee-table.component';
import {EmployeeFormDialogComponent} from './components/employee/employee-form-dialog/employee-form-dialog.component';
import {PaymentComponent} from './components/payment/payment.component';
import {PaymentTableComponent} from './components/payment/payment-table/payment-table.component';
import {PaymentFormDialogComponent} from './components/payment/payment-form-dialog/payment-form-dialog.component';
import {OrderTableComponent} from './components/order/order-table/order-table.component';
import {OrderFormDialogComponent} from './components/order/order-form-dialog/order-form-dialog.component';
import {WorkStatusComponent} from './components/work-status/work-status.component';
import {WorkStatusTableComponent} from './components/work-status/work-status-table/work-status-table.component';
import {WorkStatusFormDialogComponent} from './components/work-status/work-status-form-dialog/work-status-form-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientComponent,
    OrderComponent,
    ClientFormDialogComponent,
    ClientTableComponent,
    ServiceComponent,
    ServiceFormDialogComponent,
    ServiceTableComponent,
    PositionComponent,
    PositionTableComponent,
    PositionFormDialogComponent,
    EmployeeComponent,
    EmployeeTableComponent,
    EmployeeFormDialogComponent,
    PaymentComponent,
    PaymentTableComponent,
    PaymentFormDialogComponent,
    OrderTableComponent,
    OrderFormDialogComponent,
    WorkStatusComponent,
    WorkStatusTableComponent,
    WorkStatusFormDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
    FlexModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FlexLayoutModule,
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

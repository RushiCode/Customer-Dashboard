import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditCustomerComponent } from './dashboard/add-edit-customer/add-edit-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddEditCustomerComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DxDataGridModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

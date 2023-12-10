import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './account_control/login/login.component';
import { AdminComponent } from './roles_panels/admin/admin.component';
import { DoctorComponent } from './roles_panels/doctor/doctor.component';
import { PatientComponent } from './roles_panels/patient/patient.component';
import { RegistrationComponent } from './account_control/registration/registration.component';
import { PriceComponent } from './price/price.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReciptComponent } from './roles_panels/doctor/dialog/recipt/recipt.component';
import { ReferralComponent } from './roles_panels/doctor/dialog/referral/referral.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AdminComponent,
    DoctorComponent,
    PatientComponent,
    RegistrationComponent,
    PriceComponent,
    InfoComponent,
    ContactComponent,
    ReciptComponent,
    ReferralComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

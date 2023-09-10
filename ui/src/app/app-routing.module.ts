import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account_control/login/login.component';
import { RegistrationComponent } from './account_control/registration/registration.component';
import { AdminComponent } from './roles_panels/admin/admin.component';
import { DoctorComponent } from './roles_panels/doctor/doctor.component';
import { PatientComponent } from './roles_panels/patient/patient.component';
import { PriceComponent } from './price/price.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';

export enum RoutePages {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  PATIENT = 'paitent',
  PRICE = 'price',
  INFO = '',
  CONTACT = 'contact'
}


const routes: Routes = [
  { path: RoutePages.LOGIN, component: LoginComponent },
  { path: RoutePages.REGISTRATION, component: RegistrationComponent },
  { path: RoutePages.ADMIN, component: AdminComponent },
  { path: RoutePages.DOCTOR, component: DoctorComponent },
  { path: RoutePages.PATIENT, component: PatientComponent },
  { path: RoutePages.PRICE, component: PriceComponent },
  { path: RoutePages.INFO, component: InfoComponent },
  { path: RoutePages.CONTACT, component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

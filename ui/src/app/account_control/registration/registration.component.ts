import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public emailError: string = '';
  public nameError: string = '';
  public surenameError: string = '';
  public personalIdError: string = '';
  public countryError: string = '';
  public zipCodeError: string = '';
  public phoneNumberError: string = '';
  public registrationError: string = '';
  public submitted: boolean = false;

  private emailValidator = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  private onlyCharValidator = new RegExp('[a-z]');
  private zipCodeValidator = new RegExp('[0-9]{5}');
  private phoneNumberValidator = new RegExp('[0-9]{9}');
  private personalIdValidator = new RegExp('[0-9]{11}');
  private latestPage: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService
              ) { }

  ngOnInit(): void {
    this.latestPage = this.currentPage;
    sessionStorage.setItem('currentPage', '/registration');
  }

  get currentPage() {
    return sessionStorage.getItem('currentPage');
  }

  public registrationForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: [, Validators.required],
    name: [, Validators.required],
    surename: [, Validators.required],
    personalId: [, Validators.required],
    country: [, Validators.required],
    zipCode: [, Validators.required],
    address: [, Validators.required],
    phoneNumber: [, Validators.required],
  });


  public onSubmit(): void {
    this.submitted = true;
    this.registrationError = '';
    this.emailError = '';
    this.nameError = '';
    this.surenameError = '';
    this.personalIdError = '';
    this.countryError = '';
    this.zipCodeError = '';
    this.phoneNumberError = '';

    if (this.registrationForm.invalid) return;

    const body = {
      login: this.registrationForm?.get("login")?.value,
      password: Md5.hashStr(this.registrationForm?.get('password')?.value),
      name: this.registrationForm?.get("name")?.value,
      surename: this.registrationForm?.get("surename")?.value,
      personalId: this.registrationForm?.get("personalId")?.value,
      country: this.registrationForm?.get("country")?.value,
      zipCode: this.registrationForm?.get("zipCode")?.value,
      address: this.registrationForm?.get("address")?.value,
      phoneNumber: this.registrationForm?.get("phoneNumber")?.value
    };

    // if (this.validateRegistData(body)) return;

    this.loginService.registration(body)
      .subscribe((data: any) => {


      }, error => {
        console.error(error);
        this.registrationError = 'Invalid user/pass/server combination';
      })
  }

  private validateRegistData(registData: any): boolean {

    let goodData = true;

    if (!this.emailValidator.test(registData.login)) {
      this.emailError = 'E-mail not recognised';
      goodData = false;
    }

    if (!this.onlyCharValidator.test(registData.name)) {
        this.nameError = 'Name must have only characters';
        goodData = false;
    }

    if (!this.onlyCharValidator.test(registData.surename)) {
      this.surenameError = 'Surename must have only characters';
      goodData = false;
    }

    if (!this.personalIdValidator.test(registData.personalId)) {
      this.personalIdError = 'Personal number must be a number with 11 long';
      goodData = false;
    }

    if (!this.onlyCharValidator.test(registData.country)) {
      this.countryError = 'Country must have only characters';
      goodData = false;
    }

    if (!this.zipCodeValidator.test(registData.zipCode)) {
      this.zipCodeError = 'Zipe code must be a number and long 5';
      goodData = false;
    }
    
    if (!this.phoneNumberValidator.test(registData.phoneNumber)) {
      this.phoneNumberError = 'Phone number must be a number with long 9';
      goodData = false;
    }

    return goodData;
  }

  public back() {
    this.router.navigate([this.latestPage || '/']);
  }
}

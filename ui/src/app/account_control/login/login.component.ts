import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

import { LoginService } from '../../services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public emailError: string = '';
  public passwordError: string = '';
  public loginError: string = '';
  public submitted: boolean = false;

  private latestPage: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private toast: ToastService,
              ) { }

  ngOnInit(): void {
    this.latestPage = this.currentPage;
    sessionStorage.setItem('currentPage', '/login');
  }

  public loginForm: FormGroup = this.formBuilder.group({
    login: [, Validators.required],
    password: [, Validators.required]
  });


  onSubmit() {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) return;

    const body = {
      login: this.loginForm?.get("login")?.value,
      password: Md5.hashStr(this.loginForm?.get('password')?.value)
    };
    this.loginService.login(JSON.stringify(body))
      .subscribe((data: any) => {

        this.toast.openSnackBar('Login with successfuly', 'INFO');

        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("time", data.time);

        switch (data?.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'doctor':
            this.router.navigate(['/doctor']);
            break;
          case 'patient':
            this.router.navigate(['/patient']);
            break;
          case 'nurse':
            this.router.navigate(['/doctor']);
            break;
        }
      }, error => {
        console.error(error);
        console.log(`Invalid login data`);
        this.toast.openSnackBar('Wrong login/password combination', 'INFO');
        this.loginError = 'Invalid user/pass/server combination';
      })
  }

  get currentPage() {
    return sessionStorage.getItem('currentPage');
  }

  public back() {
    this.router.navigate([this.latestPage || '/']);
  }
}

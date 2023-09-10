import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-roles-nav',
  templateUrl: './roles-nav.component.html',
  styleUrls: ['./roles-nav.component.scss']
})
export class RolesNavComponent implements OnInit {
  private adminHeders = ['Add new employee', 'Add new price list'];
  private medHeders = ['Patient', 'My graphic', 'Add new patient', 'Recipe', 'Referral'];
  private patientHeders = ['My visits', 'Plan visit'];

  public headersForShow: any;
    public collapsed: boolean = true;

  constructor ( private loginService: LoginService,
                private toast: ToastService,
              ) {}

  ngOnInit(): void {
    switch (this.role) {
      case 'admin':
        this.headersForShow = this.adminHeders;
        break;

        case 'doctor':
        this.headersForShow = this.medHeders;
        break;

        case 'nurse':
        this.headersForShow = this.medHeders;
        break;

      case 'patient':
        this.headersForShow = this.patientHeders;
        break;
    }
  }

  get role() {
    return sessionStorage.getItem('role');
  }

  public logout() {
    this.loginService.logout()
    .subscribe(res => this.toast.openSnackBar('Logout with successful', 'INFO'),
               error => this.toast.openSnackBar('Logout failed','INFO'))
  }
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

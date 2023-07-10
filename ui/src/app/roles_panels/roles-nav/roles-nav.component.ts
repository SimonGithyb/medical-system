import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-nav',
  templateUrl: './roles-nav.component.html',
  styleUrls: ['./roles-nav.component.scss']
})
export class RolesNavComponent implements OnInit {
  private adminHeders = ['Add new employee', 'Add new price list'];
  private doctorHeders = ['Patient', 'My graphic'];
  private nurseHeders = ['Patient', 'My graphic'];
  private patientHeders = ['My visits', 'Plan visit'];

  public heaadersForShow: any;

  ngOnInit(): void {
    switch (this.role) {
      case 'admin':
        this.heaadersForShow = this.adminHeders;
        break;

        case 'doctor':
        this.heaadersForShow = this.doctorHeders;
        break;

        case 'nurse':
        this.heaadersForShow = this.nurseHeders;
        break;

      case 'patient':
        this.heaadersForShow = this.patientHeders;
        break;
    }
  }

  get role() {
    return sessionStorage.getItem('role');
  }
}

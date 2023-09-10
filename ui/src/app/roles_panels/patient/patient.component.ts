import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(private router: Router) {}

  public currentPage: string = '';
  private patientHeders = ['My visits', 'Plan visit'];
  
  ngOnInit() {
    sessionStorage.setItem('currentPage', '/patient');

    if(this.accessToken === null) {
      this.router.navigate(['/']);
    }
  }

  get accessToken() {
    return sessionStorage.getItem('accessToken');
  }
}

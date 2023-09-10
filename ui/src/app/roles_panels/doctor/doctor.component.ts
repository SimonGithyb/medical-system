import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(private router: Router) {}
  
  public currentPage: string = '';
  private heders = ['Patient', 'My graphic', 'Add new patient', 'Recipe', 'Referral'];

  ngOnInit() {
    sessionStorage.setItem('currentPage', '/doctor');

    if(this.accessToken === null) {
      this.router.navigate(['/']);
    }
  }
  
  get accessToken() {
    return sessionStorage.getItem('accessToken');
  }
}

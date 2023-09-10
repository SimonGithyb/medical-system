import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  private adminHeders = ['Add new employee', 'Add new price list'];
  public currentPage: string = '';

  ngOnInit() {
    sessionStorage.setItem('currentPage', '/admin');

    if(this.accessToken === null) {
      this.router.navigate(['/']);
    }
  }
  
  get accessToken() {
    return sessionStorage.getItem('accessToken');
  }
}

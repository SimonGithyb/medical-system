import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'ui';

  get role() {
    return sessionStorage.getItem('role');
  }

  get currentPage() {
    return sessionStorage.getItem('currentPage');
  }
}

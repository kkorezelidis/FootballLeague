import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav;
  constructor(private router: Router) {
    console.log('constructor called');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.sidenav.close();
      }
    });
  }
}

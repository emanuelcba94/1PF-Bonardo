import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  @Input() 
  public drawer?: MatDrawer;



  constructor(private router: Router, private activetedRoute: ActivatedRoute) {}

  logout(): void {
    this.router.navigate(['login', 'dashboard'], {
      // relativeTo: this.activetedRoute,
    });
  }
}

import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  @Input() 
  public drawer?: MatDrawer;

  public selectIsAdmin$: Observable<boolean>;

  constructor(
    private router: Router, 
    private activetedRoute: ActivatedRoute,
    private authservice: AuthService,
    private store: Store
    ) {
      this.selectIsAdmin$ = this.store.select(selectIsAdmin);
    }

  logout(): void {
    this.authservice.logout();
    this.router.navigate(['auth', 'login'], {});
  }
}

import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { selectAuthUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() 
  public drawer?: MatDrawer;

  today = new Date(); 

  public authUser$: Observable<User | null>;

  constructor(
    private store: Store
    ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}

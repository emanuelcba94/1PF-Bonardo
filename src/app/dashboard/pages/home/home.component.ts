import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/core/models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  today = new Date(); 




  public authUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private store: Store
    ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}

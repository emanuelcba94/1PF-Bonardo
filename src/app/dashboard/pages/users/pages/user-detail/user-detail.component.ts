import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent {
  public user: User | null = null;
  public userId?: number;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private usersService: UserService,
    ) {

    if (!Number( this.activatedRoute.snapshot.params["id"])) {
      this.router.navigate(['dashboard', 'users']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`)
    } else {
      this.userId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
    }
  }

  loadUser(): void {

    if(this.userId) {
      this.usersService.getUsersById(this.userId).subscribe({
        next: (user) => {
          if (user) {
            console.log(user)

            this.usersService.createUser({
              name: user.name,
              email: user.email,
              password: user.password,
              surname: user.surname,
            });
          }
        }
      });
    }

    

    // couserService.getCoursesByUserId(this.activatedRoute.snapshot.paramMap.get('id')),
    // usersService.getUsersById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
    //   next: (user) => {
    //     this.user = user;
    //   }
    // })
  }




}

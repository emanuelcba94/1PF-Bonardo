import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public emailControl = new FormControl('emanuelb@fake.com', [
    Validators.required, 
    Validators.email
  ])
  public passwordControl = new FormControl('12345', [
    Validators.required,
  ])

  // FormGroup
  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  })

  constructor(private authService: AuthService) {}


  login(): void {
    if (this.loginForm.invalid) {
      // For Invalido
      this.loginForm.markAllAsTouched();
    } else {
      // Form Valido
      this.authService.login(this.loginForm.getRawValue())
    }
  }

  ngOnInit(): void {
    // CARGAR DATOS
  }
}
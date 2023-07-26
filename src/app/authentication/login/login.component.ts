import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  // BOTON DE INGRESAR
  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario == 'emanuelb'&& password == 'ema123') {
      // redireccionar al dashboard
      this.fakeLoading();
    }else{
      // mostrar error
      this.error();
      this.form.reset();
    }
  }

  // MENSAJE DE ERROR
  error() {
    this._snackBar.open('El Usuario o contraseña ingresados son incorrectos', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    })
  }

  // CARGAR LOADING 
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      // redireccionar al dashboard
      this.router.navigate(['dashboard']);
    }, 2000);
  }
}




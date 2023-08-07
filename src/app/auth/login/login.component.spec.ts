import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../auth.service";

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance
    });

    // Test-1
    it('El formulario debe ser invalido, si no ingresan datos en el mismo', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        expect(component.loginForm.invalid).toBeTrue();
    })

    // Test-2
    it('Si se llama a login() y el form es invalido, se debe llamar a markAllAsTouched de loginForm', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        expect(component.loginForm.invalid).toBeTrue();
        const spyOnMark = spyOn(component.loginForm, ('markAllAsTouched'));
        component.login();
        expect(spyOnMark).toHaveBeenCalled();
    })

    // Test-3
    it('Si se llama a login() y el form es valido, se debe llamar al login del module AuthService', () => {
        const authService = TestBed.inject(AuthService);
        component.emailControl.setValue('emanuelb@fake.com');
        component.passwordControl.setValue('12345');
        expect(component.loginForm.valid).toBeTrue();
        const spyOnAuthService = spyOn(authService, 'login');
        component.login();
        expect(spyOnAuthService).toHaveBeenCalled();
    })
});
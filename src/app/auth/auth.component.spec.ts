import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { User } from "../core/models"
import { Router } from "@angular/router"
import { RouterMock } from "../core/mocks/router.mock"

describe('AuthService', () => {
    let serviceAuthService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: Router,
                    useClass: RouterMock,
                }
            ],
        });
        serviceAuthService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    afterEach (() => {
        httpController.verify();
    })

    // Test-Service-01
    it('login() = valido, el observable authUser$ debe emitir un valor', (done) => {
        const mockFakeUser: User = {
            id: 1,
            name: 'emanuel',
            surname: 'perez',
            email: 'emanuelb@fake.com',
            password: '12345',
            token: 'DjLUdjeyuodpelrjrJjr'
        };
        const mockFakeResponse: User[] = [mockFakeUser];
        serviceAuthService.login({
            email: 'emanuelb@fake.com',
            password: '12345'
        });
        httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/users?email=${mockFakeUser.email}&password=${mockFakeUser.password}`,
        }).flush(mockFakeResponse)

        serviceAuthService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(mockFakeUser);
                done();
            }
        })
    })
})
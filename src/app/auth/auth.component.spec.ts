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
})
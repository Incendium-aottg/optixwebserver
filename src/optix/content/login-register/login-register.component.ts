import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginPageState } from 'src/optix/enums/login-page-state.enum';

@Component({
	selector: 'app-login-register',
	templateUrl: './login-register.component.html',
	styleUrls: ['./login-register.component.sass']
})
export class LoginRegisterComponent {
	pageState:LoginPageState = LoginPageState.Login;

	constructor(private router: Router) {
		this.updatePageState();
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.updatePageState();
			}
		})
	}

	isLoginPage() {
		return this.pageState === LoginPageState.Login;
	}

	isRegisterPage() {
		return this.pageState === LoginPageState.Register;
	}

	isResetPage() {
		return this.pageState === LoginPageState.Reset;
	}

	updatePageState() {
		switch (this.router.url.split('/').pop()) {
			case 'login':
				this.pageState = LoginPageState.Login;
				break;
			case 'register':
				this.pageState = LoginPageState.Register;
				break;
			case 'reset':
				this.pageState = LoginPageState.Reset;
				break;
			default:
				this.pageState = LoginPageState.Login;
		}
	}
}

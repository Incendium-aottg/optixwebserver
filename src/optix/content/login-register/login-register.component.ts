import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { LoginPageState } from 'src/optix/enums/login-page-state.enum';
import { LoginDTO } from 'src/optix/models/login-dto.model';
import { LoginService } from 'src/optix/services/login-service/login.service';

@Component({
	selector: 'app-login-register',
	templateUrl: './login-register.component.html',
	styleUrls: ['./login-register.component.sass']
})
export class LoginRegisterComponent implements AfterViewInit{
	@ViewChild('usernameInput') usernameInput: ElementRef | undefined;
	pageState: LoginPageState = LoginPageState.Login;
	loginForm: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.maxLength(64)]),
		password: new FormControl('', [Validators.required]),
		confirmPassword: new FormControl(''),
		registrationToken: new FormControl(''),
	});
	submitted: boolean = false;

	constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService) {
		// Redirect if we are already logged in
		if (localStorage.getItem('username') !== null) {
			this.router.navigate(['/worldrecords'])
		}
		this.updatePageState();
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.updatePageState();
			}
		})
	}

	ngAfterViewInit() {
		this.usernameInput?.nativeElement.focus();
	}

	getFormError() {
		if (this.loginForm.get('username')?.errors && this.loginForm.get('username')?.touched) {
			if (this.loginForm.get('username')?.hasError('required')) {
				return "Username cannot be empty"
			}
			return "Username cannot be longer than 64 characters";
		}
		if (this.loginForm.get('password')?.errors && this.loginForm.get('password')?.touched) {
			if (this.loginForm.get('password')?.hasError('required')) {
				return "Password cannot be empty"
			} else if (this.loginForm.get('password')?.hasError('minlength')) {
				return "Password must be atleast 8 characters long";
			}
			return "Password cannot be longer than 64 characters";
		}
		if (this.loginForm.errors && this.loginForm.get('confirmPassword')?.touched) {
			return "Passwords do not match";
		}
		if (this.loginForm.get('registrationToken')?.errors && this.loginForm.get('registrationToken')?.touched) {
			return "Registration Token cannot be empty";
		}
		return "";
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

	onSubmit() {
		this.submitted = true;
		let loginDetails: LoginDTO = new LoginDTO(
			this.loginForm.get('username')?.value,
			this.loginForm.get('password')?.value,
			this.loginForm.get('registrationToken')?.value,
		);
		switch (this.pageState) {
			case LoginPageState.Login:
				this.loginService.login(loginDetails).pipe(take(1)).subscribe({
					next: (response) => {
						localStorage.setItem('username', loginDetails.username);
						localStorage.setItem('userID', response.body.userID);
						localStorage.setItem('role', response.body.role);
						this.toastr.success("Login successful!");
						this.submitted = false;
						this.router.navigate(['/worldrecords'])
					},
   					error: (err) => {
						this.toastr.error(err.error);
						this.submitted = false;
					}
				});
				break;
			case LoginPageState.Register:
				this.loginService.register(loginDetails).pipe(take(1)).subscribe({
					next: () => {
						this.toastr.success("Succesfully registered!");
						this.loginForm.reset();
						this.router.navigate(['/login'])
						this.submitted = false;
					},
   					error: (err) => {
						this.toastr.error(err.error);
						this.submitted = false;
					}
				});
				break;
			case LoginPageState.Reset:
				this.loginService.reset(loginDetails).pipe(take(1)).subscribe({
					next: () => {
						this.toastr.success("Password changed successfully!");
						this.loginForm.reset();
						this.router.navigate(['/login']);
						this.submitted = false;
					},
   					error: (err) => {
						this.toastr.error(err.error);
						this.submitted = false;
					}
				});
				break;
			default:
				console.log("Something very wrong happend. Please let Incendium know.")
		}
	}

	setLoginValidators() {
		this.loginForm.clearValidators();
		this.loginForm.updateValueAndValidity();
		this.loginForm.get('username')?.setValidators(Validators.required);
		this.loginForm.get('username')?.updateValueAndValidity();
		this.loginForm.get('password')?.setValidators(Validators.required)
		this.loginForm.get('password')?.updateValueAndValidity();
		this.loginForm.get('registrationToken')?.clearValidators();
		this.loginForm.get('registrationToken')?.updateValueAndValidity();
	}

	setRegisterResetValidators() {
		this.loginForm.addValidators(this.validatePasswordMatch);
		this.loginForm.updateValueAndValidity();
		this.loginForm.get('username')?.setValidators([Validators.required, Validators.maxLength(64)]);
		this.loginForm.get('username')?.updateValueAndValidity();
		this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(64)]);
		this.loginForm.get('password')?.updateValueAndValidity();
		this.loginForm.get('registrationToken')?.setValidators(Validators.required);
		this.loginForm.get('registrationToken')?.updateValueAndValidity();
	}

	updatePageState() {
		switch (this.router.url.split('/').pop()) {
			case 'login':
				this.pageState = LoginPageState.Login;
				this.setLoginValidators();
				break;
			case 'register':
				this.pageState = LoginPageState.Register;
				this.setRegisterResetValidators();
				break;
			case 'reset':
				this.pageState = LoginPageState.Reset;
				this.setRegisterResetValidators();
				break;
			default:
				this.pageState = LoginPageState.Login;
				this.setLoginValidators();
		}
	}

	private validatePasswordMatch(control: AbstractControl): {[key: string]: any} | null {
		if ((control.get('password')?.value as string) === (control.get('confirmPassword')?.value as string)) {
			return null;
		}
		return {passwordMatch: true};
	}
}

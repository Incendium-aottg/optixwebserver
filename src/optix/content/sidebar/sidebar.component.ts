import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { LoginService } from 'src/optix/services/login-service/login.service';

@Component({
	selector: 'optix-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.sass'],
	animations: [
		trigger('toggleSidebar', [
			state('open', style({ transform: 'translateX(0)' })),
			state('closed', style({ transform: 'translateX(-110%)' })),
			transition('open => closed', [
				animate('0.2s linear')
			]),
			transition('closed => open', [
				animate('0.2s linear')
			]),
		])
	],
})
export class SidebarComponent {
	sidebarOpen = false
	mobileThreshold = 600

	constructor(private cookieService: CookieService, private loginService: LoginService, private toastr: ToastrService) {}

	@HostListener('window:resize', ['$event'])

	closeSidebar() {
		this.sidebarOpen = false
	}

	getSidebarState() {
		if (this.sidebarOpen || window.innerWidth > this.mobileThreshold)
			return 'open'
		return 'closed'
	}

	logout() {
		this.loginService.logout().pipe(take(1)).subscribe({
			next: () => {
				localStorage.removeItem('username');
				this.toastr.success("Logout successful!");
			},
			error: (err) => {
				console.log(err)
				this.toastr.error(err.error);
			}
		});
	}

	isLoggedIn() {
		return localStorage.getItem('username') === null
	}

	isVisible() {
		return this.sidebarOpen || window.innerWidth > this.mobileThreshold
	}

	lockScroll() {
		return this.sidebarOpen && window.innerWidth <= this.mobileThreshold
	}

	toggleSidebar() {
		this.sidebarOpen = !this.sidebarOpen
	}
}

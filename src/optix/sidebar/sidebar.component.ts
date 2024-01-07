import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

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
	@HostListener('window:resize', ['$event'])

	getSidebarState() {
		if (this.sidebarOpen || window.innerWidth > this.mobileThreshold)
			return 'open'
		return 'closed'
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

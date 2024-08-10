import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from './content/sidebar/sidebar.component';

@Component({
	selector: 'optix-root',
	templateUrl: './optix.component.html',
	styleUrls: ['./optix.component.sass']
})

export class OptixComponent {
	@ViewChild(SidebarComponent) sidebar!: SidebarComponent;
	faBars = faBars;
	title = 'optixwebserver';

	constructor(private router: Router) {}

	isHomeRoute() {
		return this.router.url === '/';
	}

	isSidebarVisible() {
		if (this.sidebar) {
			return this.sidebar.lockScroll()
		}
		return false
	}

	toggleSidebar() {
		this.sidebar.toggleSidebar();
	}
}

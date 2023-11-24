import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'optix-root',
	templateUrl: './optix.component.html',
	styleUrls: ['./optix.component.sass']
})

export class OptixComponent {
	title = 'optixwebserver';

	constructor(private router: Router) {}

	isHomeRoute() {
		return this.router.url === '/';
	}
}

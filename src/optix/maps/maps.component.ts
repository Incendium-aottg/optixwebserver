import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faChevronRight, faCopy, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { MapService } from '../services/map.service';

@Component({
	selector: 'app-maps',
	templateUrl: './maps.component.html',
	styleUrls: ['./maps.component.sass']
})
export class MapsComponent {
	faChevronRight = faChevronRight;
	faCopy = faCopy;
	faDownload = faDownload;
	faPlay = faPlay;

	constructor(private clipboard: Clipboard, private mapService: MapService) {
		mapService.getMapsByAuthor()
	}

	copyMapScript(dom: any) {
		this.clipboard.copy(dom.parentElement.id);
	}

	downloadMapScript(dom: any) {
		alert(dom.parentElement.id);
	}
}
import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faChevronRight, faCopy, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { MapService } from '../services/map.service';

@Component({
	selector: 'app-authors',
	templateUrl: './authors.component.html',
	styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent {
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

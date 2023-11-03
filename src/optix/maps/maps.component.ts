import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faChevronRight, faCopy, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../models/author.model';
import { MapScript } from '../models/map-script.model';
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
	mapList : Author[] = [];

	constructor(private clipboard: Clipboard, private mapService: MapService) {
		mapService.getMapsByAuthor().subscribe(
			(maps) => {
				this.mapList = maps
				console.log(maps)
			}
		)
	}

	copyMapScript(dom: any) {
		this.clipboard.copy(dom.parentElement.id);
	}

	downloadMapScript(dom: any) {
		alert(dom.parentElement.id);
	}

	getMapSubtitle(map: MapScript) {
		return  map.MapSubtitle ?`[${map.MapSubtitle}]` : ''
	}

	normalizeName(name: string) {
		return name.replace(' ', '');
	}
}

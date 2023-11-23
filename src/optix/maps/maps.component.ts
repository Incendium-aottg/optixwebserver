import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faChevronRight, faCopy, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Author } from '../models/author.model';
import { MapScript } from '../models/map-script.model';
import { MapService } from '../services/map-service/map.service';

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
	fullMapList: Author[] = [];
	filteredMapList: Author[] = [];
	searchString: string = "";

	constructor(private clipboard: Clipboard, private mapService: MapService, private toastr: ToastrService) {
		mapService.getMapsByAuthor().subscribe((maps) => {
			this.fullMapList = maps;
			this.filteredMapList = this.fullMapList
		})
	}

	copyMapScript(fileName: string) {
		this.mapService.getMapScript(fileName).subscribe((script:string) => {
			this.clipboard.copy(script);
			this.toastr.success('Copied to Clipboard!');
		})
	}

	downloadAllMaps() {
		window.location.href='../../assets/mapscripts.zip';
	}

	filterMaps() {
		if (this.searchString.trim() === "") {
			this.filteredMapList = this.fullMapList
		} else {
			this.filteredMapList = []
			const normalizedSearchString = this.searchString.trim().toLowerCase()
			this.fullMapList.forEach((author) => {
				if(author.authorName.toLowerCase().includes(normalizedSearchString)) {
					this.filteredMapList.push(author)
				} else {
					let filteredMaps: MapScript[] = []
					author.maps.forEach((nextMap) => {
						if(
							nextMap.Name.toLowerCase().includes(normalizedSearchString) || 
							nextMap.MapSubtitle.toLowerCase().includes(normalizedSearchString) ||
							nextMap.AltNames.some((name) => name.toLocaleLowerCase().includes(normalizedSearchString))
						) {
							filteredMaps.push(nextMap)
						}
					})
					if(filteredMaps.length !== 0) {
						this.filteredMapList.push({
							authorName: author.authorName,
							maps: filteredMaps
						})
					}
				}
			})
		}
	}

	getDownloadFileName(fileName: string) {
		return `${fileName}.txt`
	}

	getDownloadLink(fileName: string) {
		return `../../assets/mapscripts/${fileName}.txt`
	}

	getMapSubtitle(map: MapScript) {
		return map.MapSubtitle ?`[${map.MapSubtitle}]` : ''
	}

	normalizeName(name: string) {
		return name.replace(' ', '');
	}
}

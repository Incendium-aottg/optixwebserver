import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faChevronRight, faCopy, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { BotAuthorMaps } from 'src/optix/models/bot-author-maps.model';
import { BotMap } from 'src/optix/models/bot-map.model';
import { MapService } from 'src/optix/services/map-service/map.service';

@Component({
	selector: 'app-bot-maps',
	templateUrl: './bot-maps.component.html',
	styleUrls: ['./bot-maps.component.sass']
})
export class BotMapsComponent {
	faChevronRight = faChevronRight;
	faCopy = faCopy;
	faDownload = faDownload;
	faPlay = faPlay;
	fullMapList: BotAuthorMaps[] = [];
	filteredMapList: BotAuthorMaps[] = [];
	searchString: string = "";
	unknownAuthor = 'Unknown'
	downloadingMap = false

	constructor(private clipboard: Clipboard, private mapService: MapService, private toastr: ToastrService) {
		mapService.getBotMaps().pipe(take(1)).subscribe((all_maps) => {
			// Create a list of authors
			let uniqueAuthors = new Set<string>()
			all_maps.forEach((next_map) => {
				// Get the author
				let authorIndex = next_map[1].indexOf('__')
				if (authorIndex !== -1) {
					uniqueAuthors.add(next_map[1].substring(0, authorIndex))
				}
			})
			let sortedAuthors = Array.from(uniqueAuthors).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
			sortedAuthors.push(this.unknownAuthor)

			// Create a dictionary of authors to MapRecords
			let authorMaps = Object.fromEntries(sortedAuthors.map((author) => [author, [] as string[][]]))

			// populate the authors
			all_maps.forEach((next_map) => {
				let mapTokens = next_map[1].split("__")
				if (mapTokens.length === 1) {
					authorMaps[this.unknownAuthor].push(next_map)
				} else {
					next_map[1] = mapTokens[1]
					authorMaps[mapTokens[0]].push(next_map)
				}
			})

			// Build BotAuthorMaps object; also sort the maps
			let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
			sortedAuthors.forEach((author) => this.fullMapList.push({
				authorName: author,
				maps: authorMaps[author].sort((a, b) => collator.compare(a[1], b[1]))
			}))
			this.filteredMapList = this.fullMapList
		})
	}

	copyMapScript(id: string) {
		this.mapService.getBotMapById(id).pipe(take(1)).subscribe((botMap: BotMap) => {
			this.clipboard.copy(botMap.Data);
			this.toastr.success('Copied to Clipboard!');
		})
	}
	
	downloadFile(id: string) {
		if (!this.downloadingMap) {
			// Prevent double clicks and whatever
			this.downloadingMap = true
			this.toastr.info('Downloading');
			this.mapService.getBotMapById(id).pipe(take(1)).subscribe((botMap: BotMap) => {
				const downloadLink = document.createElement('a');
				downloadLink.href = URL.createObjectURL(new Blob([botMap.Data], { type: "text" }));
				downloadLink.download = `${botMap.Name}.txt`
				if (botMap.Author !== null) {
					downloadLink.download = `${botMap.Author}__${botMap.Name}.txt`
				}
				downloadLink.click();
				this.downloadingMap = false
			})
		}
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
					let filteredMaps: string[][] = []
					author.maps.forEach((nextMap) => {
						if(nextMap[0].includes(normalizedSearchString) || nextMap[1].toLowerCase().includes(normalizedSearchString)) {
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

	getMapId(bot_id: string) {
		return Number(bot_id) * -1
	}

	normalizeName(name: string) {
		return name.replace(' ', '');
	}

}

import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, filter, mergeMap, take, tap } from 'rxjs';
import { MapType } from 'src/optix/enums/map-type.enum';
import { RunType } from 'src/optix/enums/run-type.enum';
import { BotMap } from 'src/optix/models/bot-map.model';
import { MapData } from 'src/optix/models/map-data.model';
import { MapService } from '../../services/map-service/map.service';

@Component({
	selector: 'app-map-details',
	templateUrl: './map-details.component.html',
	styleUrls: ['./map-details.component.sass']
})
export class MapDetailsComponent {
	defaultTab = RunType.World
	displayAuthors: string|null = null
	displayBotId: number|null = null
	displayCompRatio: string|null = null
	displayMapType: string|null = null
	displayNotes: string|null = null
	displayRating: string|null = null
	downloadingMap = false
	imageName = "404"
	negativeId: boolean|null = null
	public mapData: MapData|null = null

	constructor(private clipboard: Clipboard, private mapService: MapService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
		let mapDataSubscription = combineLatest([
			route.params.pipe(
				tap((param: any) => {
					if (this.negativeId === null) {
						this.negativeId = param['id'] < 0
					}
				}),
				mergeMap((param: any) => mapService.getMapStats(param['id']))
			),
			route.queryParams
		]).subscribe(([mapData, params]) => {
			this.defaultTab = params['tab'] === 'bot' ? RunType.Bot : RunType.World
			this.mapData = mapData
			this.imageName = mapData.fileName
			this.setDisplayData(mapData)
			if (params['tab'] === 'bot' || this.negativeId) {
				this.negativeId = false
				this.router.navigate([`../${mapData.id}`], { relativeTo: this.route, replaceUrl: true, queryParams: { tab: 'bot' }, queryParamsHandling: 'merge' });
			} else {
				this.router.navigate([`../${mapData.id}`], { relativeTo: this.route, replaceUrl: true});
			}
		})
		// Remember the url so we know if it changes
		let pageRoute = this.router.url
		router.events.pipe(
			filter(event => this.router.url !== pageRoute && event instanceof NavigationEnd)
		  ).subscribe((val) => {
			// Prevent the page from continueing to load even when we navigate away.
			// If the page loads successfully, it will trigger a 'router.navigate' and send us back.
			mapDataSubscription.unsubscribe()
		})
	}

	private createLinkAndDownload(data: string, fileName: string) {
		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(new Blob([data], { type: "text" }));
		downloadLink.download = fileName
		downloadLink.click();
	}

	copyMapScript() {
		if (this.mapData) {
			if (this.mapData.id >= 0) {
				// We have the map on file
				this.mapService.getMapScript(this.mapData.fileName).pipe(take(1)).subscribe((script:string) => {
					this.clipboard.copy(script);
					this.toastr.success('Copied to Clipboard!');
				})
			} else {
				// Fetch the file from the bot
				this.mapService.getBotMapById(this.mapData.botId + "").pipe(take(1)).subscribe((botMap: BotMap) => {
					this.clipboard.copy(botMap.Data);
					this.toastr.success('Copied to Clipboard!');
				})
			}
		}
	}

	defaultBotTab() {
		if (!this.hasWebData()) {
			return true
		}
		if (this.defaultTab === RunType.Bot) {
			return true
		}
		return false
	}

	downloadMapScript() {
		if (this.mapData && !this.downloadingMap) {
			this.downloadingMap = true
			this.toastr.info('Downloading');
			if (this.mapData.id >= 0) {
				// We have the map on file
				fetch(`../../assets/mapscripts/${this.mapData.fileName}.txt`).then(data => data.text()).then(script => {
					this.createLinkAndDownload(script, `${this.mapData?.fileName}.txt`)
					this.downloadingMap = false
				})
			} else {
				// Fetch the file from the bot
				this.mapService.getBotMapById(this.mapData.botId + "").pipe(take(1)).subscribe((botMap: BotMap) => {
					this.createLinkAndDownload(botMap.Data, botMap.Author == null ? `${botMap.Name}.txt` : `${botMap.Author}__${botMap.Name}.txt`)
					this.downloadingMap = false
				})
			}
		}
	}

	getMapImageLink() {
		return this.mapData ? `../../assets/images/${this.imageName}.png` : ''
	}
	
	getMapName() {
		return this.mapData ? this.mapData.name : null
	}

	hasBotData() {
		return this.mapData && this.mapData.botId > 0
	}

	hasWebData() {
		return this.mapData && this.mapData.id >= 0
	}

	private setDisplayData(mapData: MapData) {
		this.displayAuthors = mapData.authors.map(author => author.name).join(', ')
		this.displayBotId = mapData && mapData.botId > 0 ? mapData.botId : null
		if (mapData && mapData.wrRuns.length >= 3) {
			let bestTime = mapData.wrRuns[0].time
			let thirdTime = mapData.wrRuns[2].time
			this.displayCompRatio = ((thirdTime - bestTime) / thirdTime).toFixed(3)
		}
		this.displayMapType = mapData && mapData.mapType !== MapType.Unlisted ? mapData.mapType : 'N/A'
		this.displayNotes = mapData && mapData.notes ? mapData.notes : null
		this.displayRating = mapData && mapData.botRating > 0 ? `${(mapData.botRating).toFixed(2)}/5 (${mapData.botRatingCount} Votes)` : 'N/A'
	}

	setTab(tab: string) {
		this.defaultTab = tab as RunType
		this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: { tab: this.defaultTab }, queryParamsHandling: 'merge' });
	}

	use404Image() {
		if (this.mapData) {
			this.imageName = '404'
		}
	}
}

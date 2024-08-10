import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectorRef, Component } from '@angular/core';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { MapScript } from '../../models/map-script.model';
import { Run } from '../../models/run.model';
import { MapService } from '../../services/map-service/map.service';
import { RecordsService } from '../../services/records-service/records.service';

@Component({
	selector: 'optix-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent {
	faCopy = faCopy;
	faDownload = faDownload;
	newestMap: MapScript|null = null
	newestLava: Run|null = null
	newestSpeed: Run|null = null

	constructor(
		cdf: ChangeDetectorRef,
		private clipboard: Clipboard,
		private mapService: MapService,
		recordService: RecordsService,
		private toastr: ToastrService,
	) {
		this.mapService.getNewestMap().pipe(take(1)).subscribe((map) => {
			this.newestMap = map
			cdf.detectChanges();
		})
		recordService.getNewestLavaRecord().pipe(take(1)).subscribe((run) => {
			this.newestLava = run
			cdf.detectChanges();
		})
		recordService.getNewestSpeedRecord().pipe(take(1)).subscribe((run) => {
			this.newestSpeed = run
			cdf.detectChanges();
		})
	}

	copyMapScript() {
		if (this.newestMap) {
			this.mapService.getMapScript(this.newestMap.fileName).pipe(take(1)).subscribe((script:string) => {
				this.clipboard.copy(script);
				this.toastr.success('Copied to Clipboard!');
			})
		}
	}

	getMapAuthors() {
		if (this.newestMap) {
			let numAuthors = this.newestMap?.authorNames.length
			if (numAuthors === 1) {
				return `By ${this.newestMap?.authorNames[0]}`
			} else if (numAuthors === 2) {
				return `By ${this.newestMap?.authorNames.join(' and ')}`
			} else if (numAuthors > 2) {
				return `By ${this.newestMap?.authorNames.slice(0, -1).join(', ')}, and ${this.newestMap?.authorNames[numAuthors - 1]}`
			}
		}
		return ''
	}

	getMapDownloadFileName() {
		if (this.newestMap) {
			return `${this.newestMap.fileName}.txt`
		}
		return ''
	}

	getMapDownloadLink() {
		if (this.newestMap) {
			return `../../assets/mapscripts/${this.newestMap?.fileName}.txt`
		}
		return ''
	}

	getMapImageLink() {
		if (this.newestMap) {
			return `../../assets/images/${this.newestMap?.fileName}.png`
		}
		return ''
	}

	getMapName() {
		if (this.newestMap) {
			if (this.newestMap.mapSubtitle) {
				return `${this.newestMap.name} [${this.newestMap.mapSubtitle}]`
			} else {
				return this.newestMap.name
			}
		}
		return ''
	}

	getNewestSpeedLink() {
		if (this.newestSpeed) {
			return this.getYoutubeEmbed(this.newestSpeed.verification)
		}
		return ''
	}

	getNewestLavaLink() {
		if (this.newestLava) {
			return this.getYoutubeEmbed(this.newestLava.verification)
		}
		return ''
	}

	getYoutubeEmbed(link: string) {
		if (link.includes('watch?v=')) {
			return `https://www.youtube.com/embed/${link.substring(link.indexOf('=') + 1)}`
		} else if (link.includes('youtu.be')) {
			return `https://www.youtube.com/embed/${link.substring(link.lastIndexOf('/') + 1)}`
		}
		return ''
	}
}

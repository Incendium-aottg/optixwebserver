import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MapService } from '../services/map-service/map.service';

@Component({
	selector: 'optix-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent {
	faCopy = faCopy;
	faDownload = faDownload;
	fileName = 'Deathdream - Riblei'

	constructor(private clipboard: Clipboard, private mapService: MapService, private toastr: ToastrService) {}

	copyMapScript(fileName: string) {
		this.mapService.getMapScript(fileName).subscribe((script:string) => {
			this.clipboard.copy(script);
			this.toastr.success('Copied to Clipboard!');
		})
	}

	getDownloadFileName(fileName: string) {
		return `${fileName}.txt`
	}

	getDownloadLink(fileName: string) {
		return `../../assets/mapscripts/${fileName}.txt`
	}
}

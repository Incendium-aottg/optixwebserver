import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MapService } from '../../services/map-service/map.service';

@Component({
	selector: 'app-map-pages',
	templateUrl: './map-pages.component.html',
	styleUrls: ['./map-pages.component.sass']
})
export class MapPagesComponent {
	mapName = ""

	constructor(route: ActivatedRoute, mapService: MapService, router: Router) {
		route.params.pipe(
			mergeMap((param: any) => mapService.getMapStats(param['id']))
		).subscribe((map_data) => {
			this.mapName = map_data.name
			router.navigate([`../${map_data.id}`], { relativeTo: route });
		})
	}
}

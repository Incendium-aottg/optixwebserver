import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MapScript } from 'src/optix/models/map-script.model';
import { AuthorMaps } from "../../models/author-maps.model";

@Injectable({
	providedIn: 'root'
})
export class MapService {

	constructor(private http: HttpClient) {
	}

	getBotMaps(): Observable<string[][]> {
		return this.http.get<string[][]>("https://www.aottgracing.com/api/bot/maps")
	}

	getMapsByAuthor(): Observable<AuthorMaps[]> {
		return this.http.get<AuthorMaps[]>("https://www.aottgracing.com/api/maps")
	}

	getMapScript(fileName: string): Observable<any> {
		return this.http.get(`../../assets/mapscripts/${fileName}.txt`, { responseType: 'text' })
	}

	getNewestMap(): Observable<MapScript> {
		return this.http.get<MapScript>("https://www.aottgracing.com/api/maps/newest")
	}
}

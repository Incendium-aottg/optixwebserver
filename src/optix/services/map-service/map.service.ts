import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BotMap } from 'src/optix/models/bot-map.model';
import { MapData } from 'src/optix/models/map-data.model';
import { MapScript } from 'src/optix/models/map-script.model';
import { AuthorMaps } from "../../models/author-maps.model";
import { ConfigService } from '../config-service/config.service';

@Injectable({
	providedIn: 'root'
})
export class MapService {
	urlRoot = ConfigService.getURLRoot();

	constructor(private http: HttpClient) {}

	getBotMaps(): Observable<string[][]> {
		return this.http.get<string[][]>(`${this.urlRoot}bot/maps`)
	}

	getBotMapById(id: string): Observable<BotMap> {
		return this.http.get<BotMap>(`${this.urlRoot}bot/maps/${id}`)
	}

	getMaps(): Observable<MapScript[]> {
		return this.http.get<MapScript[]>(`${this.urlRoot}maps`)
	}

	getMapsByAuthor(): Observable<AuthorMaps[]> {
		return this.http.get<AuthorMaps[]>(`${this.urlRoot}author/maps`)
	}

	getMapScript(fileName: string): Observable<any> {
		return this.http.get(`../../assets/mapscripts/${fileName}.txt`, { responseType: 'text' })
	}

	getMapStats(id: number): Observable<MapData> {
		return this.http.get<MapData>(`${this.urlRoot}maps/${id}`)
	}

	getNewestMap(): Observable<MapScript> {
		return this.http.get<MapScript>(`${this.urlRoot}maps/newest`)
	}
}

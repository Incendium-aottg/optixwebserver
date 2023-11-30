import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}

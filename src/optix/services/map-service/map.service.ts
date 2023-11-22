import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';

@Injectable({
	providedIn: 'root'
})
export class MapService {

	constructor(private http: HttpClient) {
	}

	getMapsByAuthor(): Observable<Author[]> {
		return this.http.get<Author[]>("https://www.aottgracing.com/api/maps")
	}

	getMapScript(fileName: string): Observable<any> {
		return this.http.get(`../../assets/mapscripts/${fileName}.txt`, { responseType: 'text' })
	}
}

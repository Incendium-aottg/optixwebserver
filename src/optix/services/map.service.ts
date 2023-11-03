import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MapService {

	constructor(private http: HttpClient) {
	}

	getMapsByAuthor() {
		this.http.get("api/maps").subscribe(
			(res) => console.log(res)
		)
	}
}

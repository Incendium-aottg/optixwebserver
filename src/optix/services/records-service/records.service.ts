import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorRecords } from 'src/optix/models/author-records.model';

@Injectable({
	providedIn: 'root'
})
export class RecordsService {

	constructor(private http: HttpClient) { }

	getTopWorldRecords(): Observable<AuthorRecords[]> {
		return this.http.get<AuthorRecords[]>("https://www.aottgracing.com/api/worldrecords/top")
	}
}
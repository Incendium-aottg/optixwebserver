import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorRecords } from 'src/optix/models/author-records.model';

@Injectable({
	providedIn: 'root'
})
export class RecordsService {

	constructor(private http: HttpClient) { }

	getTopRecordsByPlayers(): Observable<Record<string, number[]>> {
		return this.http.get<Record<string, number[]>>("https://www.aottgracing.com/api/worldrecords/players")
	}

	getTopBotRecords(): Observable<string[][]> {
		return this.http.get<string[][]>("https://www.aottgracing.com/api/bot/records")
	}

	getTopWorldRecords(): Observable<AuthorRecords[]> {
		return this.http.get<AuthorRecords[]>("https://www.aottgracing.com/api/worldrecords/top")
	}
}

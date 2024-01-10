import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorRecords } from 'src/optix/models/author-records.model';
import { Run } from 'src/optix/models/run.model';

@Injectable({
	providedIn: 'root'
})
export class RecordsService {
	urlRoot = "https://www.aottgracing.com/api/"

	constructor(private http: HttpClient) { }

	getNewestLavaRecord(): Observable<Run> {
		return this.http.get<Run>(`${this.urlRoot}worldrecords/newestlava`)
	}

	getNewestSpeedRecord(): Observable<Run> {
		return this.http.get<Run>(`${this.urlRoot}worldrecords/newestspeed`)
	}

	getTopRecordsByPlayers(): Observable<Record<string, number[]>> {
		return this.http.get<Record<string, number[]>>(`${this.urlRoot}worldrecords/players`)
	}

	getTopBotRecords(): Observable<string[][]> {
		return this.http.get<string[][]>(`${this.urlRoot}bot/records`)
	}

	getTopWorldRecords(): Observable<AuthorRecords[]> {
		return this.http.get<AuthorRecords[]>(`${this.urlRoot}worldrecords/top`)
	}
}

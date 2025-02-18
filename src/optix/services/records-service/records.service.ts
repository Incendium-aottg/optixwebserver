import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { AuthorRecords } from 'src/optix/models/author-records.model';
import { Player } from 'src/optix/models/player.model';
import { Run } from 'src/optix/models/run.model';
import { ConfigService } from '../config-service/config.service';
import { LoginService } from '../login-service/login.service';

@Injectable({
	providedIn: 'root'
})
export class RecordsService {
	urlRoot = ConfigService.getURLRoot();

	constructor(private http: HttpClient, private loginService: LoginService, private toastr: ToastrService) {}

	addRecord(record: Run): Observable<any> {
		// Generate a CSRF token first
		return this.loginService.getCSRF().pipe(
			switchMap(() => this.http.put(`${this.urlRoot}worldrecords/addrecord`, record, {responseType: 'text', withCredentials: true}))
		);
	}

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

	getPlayers(): Observable<any[]> {
		return this.http.get<Player[]>(`${this.urlRoot}players`)
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/optix/models/player.model';
import { ConfigService } from '../config-service/config.service';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	urlRoot = ConfigService.getURLRoot();

	constructor(private http: HttpClient) {}

	generateToken(player: Player): Observable<any>{
		return this.http.post(`${this.urlRoot}admin/generateToken`, player)
	}
}

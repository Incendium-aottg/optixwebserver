import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { Player } from 'src/optix/models/player.model';
import { ConfigService } from '../config-service/config.service';
import { LoginService } from '../login-service/login.service';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	urlRoot = ConfigService.getURLRoot();

	constructor(private http: HttpClient, private loginService: LoginService, private toastr: ToastrService) {}

	generateToken(player: Player): Observable<any>{
		// Generate a CSRF token first
		return this.loginService.getCSRF().pipe(
			switchMap(() => this.http.post(`${this.urlRoot}admin/generatetoken`, player, {responseType: 'text', withCredentials: true}))
		);
	}
}

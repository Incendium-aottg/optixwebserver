import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/optix/models/login-dto.model';
import { ConfigService } from '../config-service/config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	urlRoot = ConfigService.getURLRoot();

	constructor(private http: HttpClient) {}

	login(loginDetails: LoginDTO): Observable<any> {
		return this.http.post<any>(`${this.urlRoot}login`, loginDetails, {observe: 'response', withCredentials: true})
	}
	
	logout(): Observable<any> {
		return this.http.post(`${this.urlRoot}login/logout`, null, {withCredentials: true})
	}

	register(loginDetails: LoginDTO): Observable<any> {
		return this.http.post(`${this.urlRoot}login/register`, loginDetails)
	}

	reset(loginDetails: LoginDTO): Observable<any> {
		return this.http.post(`${this.urlRoot}login/reset`, loginDetails)
	}
}

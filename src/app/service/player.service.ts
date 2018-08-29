import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class PlayerService {

	constructor(private http: HttpClient, private router: Router) { }

	url = "http://localhost:3001";
	
	getPlayers(): Observable<any> {
		let url1 = this.url+"/players";
		return this.http.get<any>(url1).map((data) => data);
	}

	getPlayerDetails(id): Observable<any> {
		let url1 = this.url+"/players/"+id;
		return this.http.get<any>(url1).map((data) => data);
	}
}

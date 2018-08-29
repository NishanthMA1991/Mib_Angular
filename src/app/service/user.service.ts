import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/map';
import { User } from "src/app/models/user.model";

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }
	url = "http://localhost:3001";
	
	addUserWithPromise(user: User): Observable<any> {
		let contentUrl = this.url+"/common/register";
		const headers = new Headers();

		return this.http.post<User>(contentUrl, user,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': 'hello'
			}
		});
	}

	verifyUser(user: User): Observable<any> {
		let contentUrl = this.url+"/common/login";
		const headers = new Headers();

		return this.http.post<User>(contentUrl, user,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': 'hello'
			}
		});
	}

	verifyUserGoogle(): Observable<any> {
		let contentUrl = this.url+"/auth/user/statergy";
		return this.http.get<any>(contentUrl).catch(this.errorHandler);
	}

	errorHandler(error: HttpErrorResponse) {
		return Observable.throw(error.message || "Server Error");
	}

	getUserDetails(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/auth/user/userdetails";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	updateUserDetails(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/auth/user/updateuserdetails";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	/*errorHandler(error: HttpErrorResponse) {
		return Observable.throw(error.message || "Server Error");
	}*.

	/*private extractData(res: Response | any) {
		console.log("extractData : "+res.status);
		console.log("extractData : "+res.json());
		let data = new User('','','','');
		data = res.json();
		console.log("data : "+data);
		let message;
		if(res.status === 200)
		{	message = "User created successfully!!!";	}
		else
		{	message = "Server error, Please try again later!!!";	}

		let body = res.json();
		console.log("body : "+body);
		return body || {};
	}

	private handleErrorObservable(error: Response) {
		let messageError;
		if(error.status === 405)
		{	messageError = "User already exists!!!";	}
		else
		{	messageError = "Server error, Please try again later111!!!";	}
		return Observable.throw(messageError);
	}*/

	private handleErrorPromise(error: Response | any) {
		return Promise.reject(error.status || error);
	}
}

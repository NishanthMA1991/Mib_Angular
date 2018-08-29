import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class VideosService {

	constructor(private http: HttpClient, private router: Router) { }
	url = "http://localhost:3001";

	getVideos(): Observable<any> {
		let url1 = this.url + "/videos";
		return this.http.get<any>(url1).map((data) => data);
	}

	postVideosComments(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/videos/comments";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	postVideosLikes(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/videos/likes";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	postVideosUnLikes(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/videos/unlikes";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	getVideoDetails(ComObj: any): Observable<any> {
		let contentUrl = this.url+"/videos/getdetails";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, ComObj,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': "hello"
			}
		});
	}

	getVideoComments(ComObj: any): Observable<any> {
		let contentUrl = this.url+"/videos/getcomments";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, ComObj,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': "hello"
			}
		});
	}
}

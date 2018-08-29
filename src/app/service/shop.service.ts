import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ShopService {
	url = "http://localhost:3001";
	constructor(private http: HttpClient) { }

	getAllProducts() {
		let url1 = this.url + "/product";
		return this.http.get<any[]>(url1).map((data) => data);
	}
	
	getAllCategories() {
		let url1 = this.url + "/category";
		return this.http.get<any[]>(url1).map((data) => data);
	}

	getFilteredProducts(category_id) {
		let url1 = this.url + "/product/filter";
		return this.http.post<any[]>(url1, {category_id}).map((data) => data);
	}

	getProduct(productId) {
		let url1 = this.url + "/product/"+productId;
		return this.http.get<any[]>(url1).map((data) => data);
	}

	addProductToCart(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/product/cart";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	getCart(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/product/getcart";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	deleteCartProduct(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/product/cart/delete";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

	checkOutCart(commObject: any,token): Observable<any> {
		let contentUrl = this.url+"/product/order";
		const headers = new Headers();

		return this.http.post<any>(contentUrl, commObject,{
			headers: {
				'Content-Type': 'application/json',
				'authentication': token
			}
		});
	}

}

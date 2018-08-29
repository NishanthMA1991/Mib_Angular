import { Component, OnInit } from '@angular/core';
import { ShopService } from "src/app/service/shop.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";
import { User } from "src/app/models/user.model";

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

	public products = [];
	public categories = [];
	public noProducts;
	selectedCategory = [];

	constructor(private ShopService: ShopService,private router : Router,private sessionService: SessionService) { }

	ngOnInit() {
		this.getProducts();
		this.getCategories();
	}

	getProducts() {
		this.ShopService.getAllProducts().subscribe((data) => {
			console.log(data);
			this.products = data;
			this.noProducts = false;
		});
	}

	getCategories() {
		this.ShopService.getAllCategories().subscribe((data) => {
			this.categories = JSON.parse(JSON.stringify(data)).category;
		});
	}

	filter(event, category_id) {
		if (event.target.checked) {
			this.selectedCategory.push(category_id);
		} else if (!event.target.checked) {
			const index: number = this.selectedCategory.indexOf(category_id);
			this.selectedCategory.splice(index, 1);
		}

		if (this.selectedCategory.length == 0) {
			this.getProducts();
		} else {
			this.ShopService.getFilteredProducts(this.selectedCategory).subscribe((data) => {
				console.log(data['products'].length);
				if (data['products'].length != 0) {
					this.products = data;
					this.noProducts = false;
				} else if (data['products'].length == 0) {
					this.noProducts = true;
					this.products = [];
				}
			});
		}
	}

	goToProduct(productId) {
		this.router.navigate(['shop/product/'+productId]);
	}

	addToCart(productId){
		if(this.sessionService.getValueFromSession('isLoggedIn'))
		{
			var ComObj = {'productID' : productId,'qty' : "1",'userID' : this.sessionService.getValueFromSession("_id") };
			this.ShopService.addProductToCart(ComObj,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				alert(returneddata.message);		
			},
			err => {
				//console.log("err : "+JSON.stringify(err));

				if(err.hasOwnProperty('error'))
				{
					if(err.error.indexOf('jwt expired')>0 )
					{
						this.sessionService.clearSession();
						this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
						alert("Session expired. Please login!!! ");
						this.router.navigate(['login-information/login']);
					}
					else{
						alert(err.error);
					}
				}
				
			})
		}
		else{
			alert("Please login to continue !!!")
		}
	}
}

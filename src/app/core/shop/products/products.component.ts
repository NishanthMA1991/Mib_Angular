import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "src/app/service/shop.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";
import { User } from "src/app/models/user.model";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	productId = "";
	public product = [];

	constructor(private route: ActivatedRoute, private ShopService: ShopService, private router: Router,private sessionService: SessionService) { }

	ngOnInit() {
		this.productId = this.route.snapshot.params.product_id;
		this.getMyProduct(this.productId);
	}

	getMyProduct(productId) {
		this.ShopService.getProduct(productId).subscribe((data) => {
			this.product = data;
		});
	}

	goToCart() {
		if(this.sessionService.getValueFromSession('isLoggedIn'))
		{
			var ComObj = {'productID' : this.productId,'qty' : "1",'userID' : this.sessionService.getValueFromSession("_id") };
			this.ShopService.addProductToCart(ComObj,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				this.router.navigate(['shop/cart']);	
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
						if(err.error.indexOf("Product already added to cart!!!")>=0)
						{
							this.router.navigate(['shop/cart']);
						}
						else
						{	alert(err.error);	}
					}
				}	
			})
		}
		else{
			alert("Please login to continue !!!")
		}	
	}

	addToCart(){
		if(this.sessionService.getValueFromSession('isLoggedIn'))
		{
			var ComObj = {'productID' : this.productId,'qty' : "1",'userID' : this.sessionService.getValueFromSession("_id") };
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

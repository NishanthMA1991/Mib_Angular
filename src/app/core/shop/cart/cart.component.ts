import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from "src/app/session.service";
import { ShopService } from "src/app/service/shop.service";
import { User } from "src/app/models/user.model";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	cartDetails;
	csString = [1,2,3];
	csValue = '2';  
	totalSum = 0; 
	noProduct:boolean = false;
	constructor(private router: Router,private sessionService: SessionService,private ShopService: ShopService) { }

	ngOnInit() {
		if(this.sessionService.getValueFromSession('isLoggedIn'))
		{
			this.getcart(this.sessionService.getValueFromSession("_id"));
		}
		else{
			alert("Please login!!!");
			this.router.navigate(['shop/productlist']);
		}	
	}

	getcart(id){
		var ComObj = {'userID' : id };
		this.ShopService.getCart(ComObj,this.sessionService.getValueFromSession("_t")).subscribe(res => {
			let returneddata: any = res;
			let returneddata1 = JSON.parse(JSON.stringify(returneddata));
			if(returneddata1.hasOwnProperty('message')){
				this.noProduct = true;
				this.cartDetails = [];
			}else{
				this.cartDetails = returneddata1.cart;	
				//alert(returneddata1.message);
				this.totalSum = returneddata1.sum;
			}
			
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
	goToShop() {
		this.router.navigate(['shop/productlist']);
	}

	deleteProduct(PId){
		var ComObj = {'userID' : this.sessionService.getValueFromSession("_id"),'product_id':PId };
		this.ShopService.deleteCartProduct(ComObj,this.sessionService.getValueFromSession("_t")).subscribe(res => {
			let returneddata: any = res;
			alert(returneddata.success);
			this.getcart(this.sessionService.getValueFromSession("_id"));
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

	checkout(){
		var ComObj = {'userID' : this.sessionService.getValueFromSession("_id")};
		this.ShopService.checkOutCart(ComObj,this.sessionService.getValueFromSession("_t")).subscribe(res => {
			let returneddata: any = res;
			alert(returneddata.success);
			this.goToShop();
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

	// changeqty(value,newValue) {
	// 	alert(newValue);
	// 	alert(value);
	// }


}

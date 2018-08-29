import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from "src/app/core/shop/shop.component";
import { ProductsListComponent } from "src/app/core/shop/products-list/products-list.component";
import { ProductsComponent } from "src/app/core/shop/products/products.component";
import { CartComponent } from "src/app/core/shop/cart/cart.component";

const routes: Routes = [
	{
		path: '', component: ShopComponent, children: [
			{ path: 'productlist', component: ProductsListComponent },
			{ path: 'product/:product_id', component: ProductsComponent },
			{ path: 'cart', component: CartComponent },
			{ path: '**', redirectTo: 'home' }
		]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShopRoutingModule { }

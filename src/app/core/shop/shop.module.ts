import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		ShopRoutingModule,
		FormsModule
	],
	declarations: [ShopComponent, ProductsListComponent, ProductsComponent, CartComponent],
	entryComponents: [
		ProductsListComponent
	]
})
export class ShopModule { }

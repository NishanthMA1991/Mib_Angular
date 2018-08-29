import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as myGlobals from 'src/app/globals/globals';
import { SessionService } from "src/app/session.service";
import { UserService } from "src/app/service/user.service";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { User } from "src/app/models/user.model";


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	LoggedInUserDetails = new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f'));

	constructor(private router: Router,private sessionService: SessionService) { 
		this.sessionService.LoggedInUserDetails.subscribe(
			(FromUFlag : User)=>this.LoggedInUserDetails = JSON.parse(JSON.stringify(FromUFlag))
		)
	}
	
	ngOnInit() {

	}

	openCart() {
		if(this.sessionService.getValueFromSession('isLoggedIn'))
		{
			this.router.navigate(['shop/cart']);
		}
		else{
			alert("Please login to continue !!!")
		}
	}

	openLogin() {
		this.router.navigate(['login-information']);
	}

	closeLogin(){
		this.sessionService.clearSession();
		this.LoggedInUserDetails.email=null;
		this.LoggedInUserDetails.isLoggedIn=null;
		this.LoggedInUserDetails.role=null;
		this.LoggedInUserDetails.token=null;
		this.router.navigate(['/']);
	}

	goToHome() {
		this.router.navigate(['/']);
	}

	goTovideos() {
		this.router.navigate(['videos/videoslist']);
	}

	goToStats() {
		this.router.navigate(['players/playerlist']);
	}

	goToShopping() {
		this.router.navigate(['shop/productlist']);
	}

	goToChats() {
		alert('Comming Soon!!!');
	}

	goToAboutUS() {
		alert('Comming Soon!!!');
	}

	editProfile(){
		this.router.navigate(['editprofile']);
	}
}

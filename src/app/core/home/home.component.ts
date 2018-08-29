import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";
import * as myGlobals from 'src/app/globals/globals';
import { User } from "src/app/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private sessionService: SessionService,private route: ActivatedRoute,private router: Router) { }

	ngOnInit() {
		let Token = this.route.snapshot.paramMap.get('Token');
		let user = this.route.snapshot.paramMap.get('user');
		let type = this.route.snapshot.paramMap.get('type');
		let id = this.route.snapshot.paramMap.get('id');
		let fullName = this.route.snapshot.paramMap.get('fullName');

		if(Token!=null)
		{
			console.log("Token : "+Token+"user : "+user+"type : "+type);
			this.sessionService.setValueToSession('isLoggedIn', true);
			this.sessionService.setValueToSession('_t',Token);
			this.sessionService.setValueToSession('_u', user);
			this.sessionService.setValueToSession('_r', type);
			this.sessionService.setValueToSession('_id', id);
			this.sessionService.setValueToSession('_FN', fullName);
			this.sessionService.setValueToSession('_f', user.substring(0,user.indexOf( "@" )));
			
			this.router.navigate(['/']);
		}
		this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_FN')));
	}
}

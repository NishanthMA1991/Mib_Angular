import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from "src/app/models/user.model";
import { UserService } from "src/app/service/user.service";
import { Router } from '@angular/router';
import * as myGlobals from 'src/app/globals/globals';
import { NgForm } from "@angular/forms";
import { SessionService } from "src/app/session.service";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public Users = [];
	enteredUser = new User('','','','');
	user = new User('','','','');
	user1 = new User('','','','');
	errorMessage = myGlobals.getError();
	successMessage = myGlobals.getSuccess();
	public confirmPassword;

	constructor(private router: Router,private userService: UserService,private sessionService: SessionService) { }

	ngOnInit() {
		myGlobals.setError('');
		myGlobals.setSuccess('');
	}

	login(enteredUser: User,form :NgForm): void {
		this.userService.verifyUser(this.enteredUser).subscribe(
			res => {
				let returnedUser: any = res;
				this.successMessage = returnedUser.success;
				this.errorMessage = "";
				form.resetForm();
				myGlobals.setError("");
				this.sessionService.setValueToSession('isLoggedIn', true);
				this.sessionService.setValueToSession('_t', returnedUser.token);
				this.sessionService.setValueToSession('_u', returnedUser.UserName);
				this.sessionService.setValueToSession('_r', returnedUser.Role);
				this.sessionService.setValueToSession('_id', returnedUser.id);
				this.sessionService.setValueToSession('_FN', returnedUser.fullName);
				this.sessionService.setValueToSession('_f', returnedUser.UserName.substring(0,returnedUser.UserName.indexOf( "@" )));
				
				this.router.navigate(['/']);
			},
			err => {
				if(err.error.error!="")
				{
					form.resetForm();
					this.sessionService.setValueToSession('isLoggedIn', false);
					this.errorMessage = err.error.error;
					this.successMessage = "";
					//myGlobals.setError(err.error.error);
					myGlobals.setSuccess("");
					myGlobals.setUserName("");
					myGlobals.setRole("");
				}
			}
		);
	}

	loginWithGoogle(){

		this.userService.verifyUserGoogle().subscribe(
			data => alert(data),
			error => alert(error)
		);
	}

}

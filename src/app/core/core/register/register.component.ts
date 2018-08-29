import { Component, OnInit } from '@angular/core';
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { NgForm } from "@angular/forms";
import * as myGlobals from 'src/app/globals/globals';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public Users = [];
	enteredUser = new User('','','','');
	returnedUser = [];
	public errorMessage="";
	public successMessage="";
	public confirmPassword;

	constructor(private router: Router, private userService: UserService) { }

	ngOnInit() {
		myGlobals.setError('');
		myGlobals.setSuccess('');
	}

	register(enteredUser: User,form :NgForm): void {

		console.log("enteredUser : " + this.enteredUser)

		this.userService.addUserWithPromise(this.enteredUser).subscribe(
			res => {
				let returnedUser: any = res;
				console.log("returnedUser : "+returnedUser);
				// this.successMessage = returnedUser.success;
				// this.errorMessage = "";
				form.resetForm();
				myGlobals.setSuccess(returnedUser.success+", Please login to continue. ");
				myGlobals.setError("");
				this.router.navigate(['login-information/login']);
				
			},
			err => {
				console.log("err : "+JSON.stringify(err));

				if(err.error.error!="")
				{
					form.resetForm();
					this.errorMessage = err.error.error;
					this.successMessage = "";
					console.log("this.errorMessage : "+this.errorMessage);
					alert(this.errorMessage);
					//myGlobals.setError(err.error.error);
					myGlobals.setSuccess("");
				}
				else if(err.error.message.indexOf('duplicate key error collection')>0 ){
					this.errorMessage = 'User already exists!!!';
					this.successMessage = "";
					//this.router.navigate(['login-information/register']);
					form.resetForm();
					//myGlobals.setError("User already exists!!!");
					myGlobals.setSuccess("");
				}
				else{
					this.errorMessage = 'Internal server error, Please try again later!!!';
					this.successMessage = "";
				}
			}
		);
	}
}

import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";
import { UserService } from "src/app/service/user.service";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	constructor(private sessionService: SessionService,private userService: UserService,private router: Router) { }
	public userDetails;
	enteredUser = new User('','','','');
	errorMessage="";
	successMessage = "";

	ngOnInit() {
		this.getUserDetails();
	}

	getUserDetails(){
		if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var commObject = {'userID':this.sessionService.getValueFromSession("_id")};
			this.userService.getUserDetails(commObject,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				this.userDetails = returneddata.data
				console.log("returneddata : "+JSON.stringify(this.userDetails));	
				this.enteredUser.fullName = this.userDetails.fullName;
				this.enteredUser.email = this.userDetails.email;
				this.enteredUser.phoneNumber = this.userDetails.phoneNumber;
				this.enteredUser.snumber = this.userDetails.address.number;
				this.enteredUser.street = this.userDetails.address.street;
				this.enteredUser.city = this.userDetails.address.city;
				this.enteredUser.state = this.userDetails.address.state;
				this.enteredUser.country = this.userDetails.address.country;
				this.enteredUser.zip = this.userDetails.address.zip;
			},
			err => {

				if(err.error.indexOf('jwt expired')>0 )
				{
					this.sessionService.clearSession();
					this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
					alert("Session expired. Please login!!! ");
					this.router.navigate(['login-information/login']);
				}
				if(err.error.indexOf('Not Found')>0 ){
					alert("Internal server error. Please try again later!!!");
				}
			})
		}
		else{
			alert("Please Login!!!");	
		}
	}
  
	edit(enteredUser: User,form :NgForm): void {
			
		console.log("enteredUser : " + this.enteredUser)
		enteredUser.id = this.sessionService.getValueFromSession("_id");
		this.userService.updateUserDetails(this.enteredUser,this.sessionService.getValueFromSession("_t")).subscribe(
			res => {
				let returnedUser: any = res;
				console.log("returnedUser : "+returnedUser);
				this.successMessage = "Updated successfully!!!";
				this.errorMessage = "";
				this.getUserDetails();
				this.router.navigate(['editprofile']);
			},
			err => {
				console.log("err : "+JSON.stringify(err));

				this.errorMessage = err.error
				this.successMessage = "";
				
			}
		);
	}
}

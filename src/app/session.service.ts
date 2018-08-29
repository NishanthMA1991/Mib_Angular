import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";
import { User } from "src/app/models/user.model";

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	LoggedInUserDetails = new EventEmitter<User>();

	constructor() { }

	setValueToSession(key: string, value: any) {
		if (sessionStorage) {
			sessionStorage.setItem(key, JSON.stringify(value));
		} else {
			alert('Your current browser doesnot support Session');
		}
	}

	getValueFromSession(key: string) {
		if (sessionStorage.getItem(key) !== '') {
			return JSON.parse(sessionStorage.getItem(key));
		} else {
			alert('No such value in session');
		}
	}

	removeSessionItem(key: string) {
		sessionStorage.removeItem(key);
	}

	clearSession() {
		sessionStorage.clear();
	}

}

import { Component, OnInit } from '@angular/core';
import { ChatService } from "src/app/service/chat.service";
import { SessionService } from "src/app/session.service";

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	toggleDisp = true;
	queAnsList = [];
	randomAns: string;
	answerToggle = true;
	messages: string[] = [];
	ioConnection: any;
	userEmailId: string = this.sessionServices.getValueFromSession('_u');
	userName: string = this.sessionServices.getValueFromSession('_FN');
	messageContent: string;

	constructor(private ChatService: ChatService, private sessionServices: SessionService) { }

	ngOnInit() {
		this.ChatService.initSocket();
		this.ChatService.onMessage();

		//To listen to the socket messages
		setTimeout(() => {
			this.initIoConnection();
		}, 0);
	}

	onToggleDisp() {
		this.toggleDisp = !this.toggleDisp;
		this.getChatDetails();
	}

	getChatDetails() {
		this.ChatService.fetchQuestions().subscribe(data => {
			this.queAnsList = data.data;
		})
	}

	showAnswers(id) {
		var selected = this.queAnsList.filter(
			que => que._id === id);
		var queAns = selected[0].answer;
		this.answerToggle = !this.answerToggle;
		var len = queAns.length;
		this.randomAns = queAns[(Math.floor(Math.random() * len / 2) + 1)]
	}

	private initIoConnection(): void {
		this.ChatService.initSocket();

		this.ioConnection = this.ChatService.onMessage()
			.subscribe((message: string) => {
				let temp = message
				this.messages.push(temp);
		});
	}

	checkLogged() {
		if (!this.sessionServices.getValueFromSession('isLoggedIn')) {
			alert('Please Login to chat')
		}
	}

	startChat(messageVal: HTMLInputElement) {
		if (!this.sessionServices.getValueFromSession('isLoggedIn')) {
			alert('Please Login to chat')
		} else {
			this.ChatService.joinchat(this.userEmailId);
			let tempval = this.sessionServices.getValueFromSession('_FN') + " : " + messageVal.value;
			this.ChatService.send(tempval);
			this.messageContent = null;
			messageVal.value = '';
		}
	}

}

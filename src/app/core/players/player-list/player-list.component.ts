import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/service/player.service";
import { SessionService } from "src/app/session.service";
import { User } from "src/app/models/user.model";

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

	public playersList = [];
	constructor(private router: Router,
		private playerService: PlayerService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.getAllPlayers();
	}

	getAllPlayers() {
		this.playerService.getPlayers().subscribe(data => {
			this.playersList = data;
		})

	}
	viewPlayer(id) {
		this.router.navigate(['player/' + id]);
	}

}

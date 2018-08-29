import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/service/player.service";

@Component({
	selector: 'app-player-details',
	templateUrl: './player-details.component.html',
	styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private playerService: PlayerService) { }
	public pid: string;
	public details = [];
	ngOnInit() {
		this.pid = this.route.snapshot.paramMap.get('playerId');
		this.getPlayerDetails(this.pid);
	}
	getPlayerDetails(id) {
		this.playerService.getPlayerDetails(id).subscribe((data => {
			this.details = data;
			console.log(JSON.stringify(this.details));
		}))
	}

}

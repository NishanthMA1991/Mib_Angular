import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from "src/app/core/players/players.component";
import { PlayerListComponent } from "src/app/core/players/player-list/player-list.component";
import { PlayerDetailsComponent } from "src/app/core/players/player-details/player-details.component";

const routes: Routes = [
	{
		path: '', component: PlayersComponent, children: [
			{ path: 'playerlist', component: PlayerListComponent },
			{ path: 'playerdetails/:playerId', component: PlayerDetailsComponent },
			{ path: '**', redirectTo: 'home' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlayersRoutingModule { }

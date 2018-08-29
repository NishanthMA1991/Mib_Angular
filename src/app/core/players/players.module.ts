import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@NgModule({
	imports: [
		CommonModule,
		PlayersRoutingModule
	],
	declarations: [PlayersComponent, PlayerListComponent, PlayerDetailsComponent],
	entryComponents: [
		PlayerListComponent
	]
})
export class PlayersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { VideosListComponent } from './videos-list/videos-list.component';

@NgModule({
	imports: [
		CommonModule,
		VideosRoutingModule,
		FormsModule
	],
	declarations: [VideosComponent, VideosListComponent],
	entryComponents: [
		VideosListComponent
	]
})
export class VideosModule { }

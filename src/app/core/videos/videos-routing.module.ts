import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from "src/app/core/videos/videos.component";
import { VideosListComponent } from "src/app/core/videos/videos-list/videos-list.component";

const routes: Routes = [
	{
		path: '', component: VideosComponent, children: [
			{ path: 'videoslist', component: VideosListComponent },
			{ path: '**', redirectTo: 'home' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideosRoutingModule { }
{

}
import { NgModule } from '@angular/core';
import {
	Routes,
	RouterModule,
	PreloadAllModules
} from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { EditProfileComponent } from "src/app/core/edit-profile/edit-profile.component";



const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'editprofile', component: EditProfileComponent },
	{
		path: 'login-information',
		loadChildren: './core/core/core.module#CoreModule'
	},
	{
		path: 'admin-access',
		loadChildren: './admin/admin.module#AdminModule'
	},
	{
		path: 'user-access',
		loadChildren: './user/user.module#UserModule'
	},
	{
		path: 'players',
		loadChildren: './core/players/players.module#PlayersModule'
	},
	{
		path: 'shop',
		loadChildren: './core/shop/shop.module#ShopModule'
	},
	{
		path: 'videos',
		loadChildren: './core/videos/videos.module#VideosModule'
	},
	{
		path: 'home/x_Token/:Token/user/:user/type/:type/id/:id/fullName/:fullName',
		component: HomeComponent
	},
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }

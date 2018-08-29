import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//for http services
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "src/app/service/user.service";


@NgModule({
	imports: [
		CommonModule,
		CoreRoutingModule,
		FormsModule,
		HttpClientModule
	],
	declarations: [
		CoreComponent,
		LoginComponent,
		RegisterComponent
	],
	entryComponents: [
		LoginComponent
	],
	providers: [UserService]
})
export class CoreModule { }

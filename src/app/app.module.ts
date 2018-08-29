import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// For form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { TestimonialComponent } from './core/home/testimonial/testimonial.component';

//for http services
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "src/app/service/user.service";
import { PlayersComponent } from "src/app/core/players/players.component";
import { PlayerService } from "src/app/service/player.service";
import { VideosService } from "src/app/service/videos.service";
import { ChatComponent } from './core/chat/chat.component';
import { ChatService } from "src/app/service/chat.service";
import { ShopService } from "src/app/service/shop.service";
import { EditProfileComponent } from './core/edit-profile/edit-profile.component';

//for youtube videos
//import { YoutubePlayerModule } from 'ng2-youtube-player';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        TestimonialComponent,
        ChatComponent,
        EditProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CarouselModule.forRoot()
    ],
    providers: [UserService,PlayerService,VideosService,ChatService,ShopService],
    bootstrap: [AppComponent]
})
export class AppModule { }

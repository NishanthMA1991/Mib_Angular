import { Component, OnInit } from '@angular/core';
import { VideosService } from "src/app/service/videos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "src/app/session.service";
import { User } from "src/app/models/user.model";
import { DomSanitizer } from "@angular/platform-browser"; 

@Component({
	selector: 'app-videos-list',
	templateUrl: './videos-list.component.html',
	styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {
	public videoList;
	public videosComments;
	public videosUserComments;
	public videoData;
	redis_Like = 0;
	redis_UnLike = 0;
	dataByuserLike:boolean = false;
	dataByuserUnLike:boolean = false;
	public safeURL;
	videoURL = 'https://www.youtube.com/embed/'; 
	

	// player: YT.Player;
	//private id = '';
	comment = "";
	selectedVideoId = "";
	

	constructor(private router: Router, private VideosService: VideosService, private route: ActivatedRoute,private sessionService: SessionService,private _sanitizer: DomSanitizer ) { }
	
	ngOnInit() {
		this.getAllVideos();
	}

	getAllVideos() {
		this.VideosService.getVideos().subscribe(data => {
			this.videoList = data;
		})
	}

	playVideos(id){
		this.selectedVideoId = id;
		this.getComment(this.selectedVideoId);
		this.getVideoDetails(this.selectedVideoId);

		var selectedVideo = this.videoList.videosList.filter(
			videos => videos._id === id);
		let videoId = selectedVideo[0].videoYtID;

		this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`${this.videoURL}${videoId}?controls=1`); 
	}
	
	getComment(id){
		//Get comments
		var ComObj = {'videoID' : id };
		this.VideosService.getVideoComments(ComObj).subscribe(data => {
			this.videosComments = data.videosComments.comment;
			this.videosUserComments = data.videosComments.user;
		})
	}

	getVideoDetails(id){
		//Get comments
		this.dataByuserLike = false;
		this.dataByuserUnLike = false;
		var ComObj = {'videoID' : id,'userID' : this.sessionService.getValueFromSession("_id") };
		this.VideosService.getVideoDetails(ComObj).subscribe(data => {
			this.videoData = data.videoData;
			this.redis_UnLike = this.videoData.redis_UnLike;
			this.redis_Like = this.videoData.redis_Like;
			if(this.videoData.videosLikes[0].likes)
			{
				this.dataByuserLike = true;
				this.dataByuserUnLike = false;
			}
			else{
				this.dataByuserUnLike = true;
				this.dataByuserLike = false;
			}
		})
	}

	// savePlayer(player) {
	// 	this.player = player;
	// 	console.log('player instance', player)
	// }

	// onStateChange(event) {
	// 	console.log('player state', event.data);
	// }

	OnComment(){
		if(this.comment=="")
		{	alert("Please enter comment!!!");	}
		else if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var updatedComment = this.sessionService.getValueFromSession("_FN")+" : "+this.comment;
			
			var commObject = {'videoID':this.selectedVideoId,'userID':this.sessionService.getValueFromSession("_id"),'comments':this.comment};
			this.VideosService.postVideosComments(commObject,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				this.comment = "";	
				this.getComment(this.selectedVideoId);			
			},
			err => {
				//console.log("err : "+JSON.stringify(err));

				if(err.error.indexOf('jwt expired')>0 )
				{
					this.sessionService.clearSession();
					this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
					alert("Session expired. Please login!!! ");
					this.router.navigate(['login-information/login']);
				}
			})
		}
		else{
			alert("Please Login!!!");
			this.comment = "";	
		}
	}

	OnLike(){
		if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var commObject = {'videoID':this.selectedVideoId,'userID':this.sessionService.getValueFromSession("_id"),'likes':'1'};
			this.VideosService.postVideosLikes(commObject,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				this.comment = "";	
				this.getVideoDetails(this.selectedVideoId);			
			},
			err => {
				if(err.error.indexOf('jwt expired')>0 )
				{
					this.sessionService.clearSession();
					this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
					alert("Session expired. Please login!!! ");
					this.router.navigate(['login-information/login']);
				}
			})
		}
		else{
			alert("Please Login!!!");	
		}
	}

	OnUnLike(){
		if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var commObject = {'videoID':this.selectedVideoId,'userID':this.sessionService.getValueFromSession("_id"),'likes':'0'};
			this.VideosService.postVideosUnLikes(commObject,this.sessionService.getValueFromSession("_t")).subscribe(res => {
				let returneddata: any = res;
				this.comment = "";	
				this.getVideoDetails(this.selectedVideoId);				
			},
			err => {
				if(err.error.indexOf('jwt expired')>0 )
				{
					this.sessionService.clearSession();
					this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
					alert("Session expired. Please login!!! ");
					this.router.navigate(['login-information/login']);
				}
			})
		}
		else{
			alert("Please Login!!!");	
		}
	}
}

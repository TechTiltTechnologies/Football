import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,ToastController,AlertController,Platform } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { StarterPage } from '../starter/starter';
import { Storage } from '@ionic/storage'
import { PlayerDetailsPage } from '../player-details/player-details';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AddTeamRatingPage } from '../add-team-rating/add-team-rating';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

@IonicPage()
@Component({
  selector: 'page-other-team',
  templateUrl: 'other-team.html',
})
export class OtherTeamPage {
  teamdetails:any;
  teams:any;
  players:any;
  @ViewChild('SwipedSTabsSlider') SwipedSTabsSlider: Slides ;
  @ViewChild('slider') slider: Slides;
  SwipedTabsIndicator :any= null;
  SwipedSTabsIndicator :any= null;
  tabs:any=[];
  stabs:any = [];
  playerData:any;
  player:any;
  status:any
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing,
    private screenshot: Screenshot, private platform: Platform, public alertCtrl:AlertController, public storage:Storage,public loadingCtrl:LoadingController,private http: Http,public toastCtrl:ToastController, public navParams: NavParams) {
    this.teamdetails = navParams.get('teamdetails');
    this.status = navParams.get('status')
    console.log(this.teamdetails)
    if (this.status == undefined){
      this.status = null;
    }
    else{
      this.status = "Hai"
    }
    this.teams = this.teamdetails.teamdetails;
    this.players = this.teams.team_players_details;
    this.stabs = ["Team Details","Contacts"];

    storage.get('playerData').then((val) => {
      this.playerData = val;
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherTeamPage');
    this.SwipedSTabsIndicator = document.getElementById("indicators");
  }
    selectSTab(index) {
      this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
      this.SwipedSTabsSlider.slideTo(index,500);
      }
  updateSIndicatiorPosition() {
    if(this.SwipedSTabsSlider.length()> this.SwipedSTabsSlider.getActiveIndex())
    {
    this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedSTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }
    }
    
    animateSIndicator($event){
    if(this.SwipedSTabsIndicator)
    this.SwipedSTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedSTabsSlider.length()-1)));
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  joinTeam(){

    if(this.playerData.team_id == "0"){
      if(this.playerData != null){
        console.log(this.teamdetails)
        var headers = new Headers();
     
        headers.append('Accept', 'application/json');
        
        headers.append('Content-Type', 'application/json' );
        
        let options = new RequestOptions({ headers: headers });
        
        let value = {
    
          team_id : this.teams.team_id,
    
          player_id : this.playerData.player_id,

          captain_id : this.teams.captain_id
      
        };
       
        let loader = this.loadingCtrl.create({
        
        content: 'please wait…',
        
        });
        console.log(value)
        loader.present().then(() => {
        
        this.http.post('https://www.dev.glowup.me/football/api/jointeam_send_sms',value,options)
        
        .map(res => res.json())
        
        .subscribe(res => {
        
        console.log(res)
        
       
        if(res.status == 200){
 
          loader.dismiss()
          let toast  = this.toastCtrl.create({
           message: 'Request Sent Successfully',
           duration: 3000,
           position: 'bottom'
         
         });
       
         toast.onDidDismiss(() => {
           console.log('Dismissed toast');
         });
         
         toast.present();
        
        } else
        
        {
    
          loader.dismiss()
          let toast  = this.toastCtrl.create({
            message: 'Please Try again later',
            duration: 3000,
            position: 'bottom'
          
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          
          toast.present();
      
      }
      
      });
      
      });
     }
     else{
       this.navCtrl.push(StarterPage)
     }
    }else{
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'You are already have a team.So you could not join this team ',
        buttons: ['Ok']
      });
      alert.present();
    }
   
  }

  
  inviteteam(){

    if(this.playerData.team_id != "0"){
      if(this.playerData != null){
        console.log(this.teamdetails)
        var headers = new Headers();
     
        headers.append('Accept', 'application/json');
        
        headers.append('Content-Type', 'application/json' );
        
        let options = new RequestOptions({ headers: headers });
        
        let value = {
    
          res_team_id : this.teams.team_id,
    
          req_team_id : this.playerData.team_id,

          res_captain_id : this.teams.captain_id
      
        };
       
        let loader = this.loadingCtrl.create({
        
        content: 'please wait…',
        
        });
        console.log(value)
        loader.present().then(() => {
        
        this.http.post('https://www.dev.glowup.me/football/api/invite_team_send_sms',value,options)
        
        .map(res => res.json())
        
        .subscribe(res => {
        
        console.log(res)
        
       
        if(res.status == 200){
 
          loader.dismiss()
          let toast  = this.toastCtrl.create({
           message: 'Request Sent Successfully',
           duration: 3000,
           position: 'bottom'
         
         });
       
         toast.onDidDismiss(() => {
           console.log('Dismissed toast');
         });
         
         toast.present();
        
        } else
        
        {
    
          loader.dismiss()
          let toast  = this.toastCtrl.create({
            message: 'Please Try again later',
            duration: 3000,
            position: 'bottom'
          
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          
          toast.present();
      
      }
      
      });
      
      });
     }
     else{
       this.navCtrl.push(StarterPage)
     }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'You dont have any team.First you should create team',
        buttons: ['Ok']
      });
      alert.present();
    }
   
  }
  showplayer(player){
    this.player = {
    single : player 
   }  
   this.navCtrl.push(PlayerDetailsPage,this.player);

}
rating(){
  this.navCtrl.push(AddTeamRatingPage,{
    team:this.teamdetails
  })
}

share(){

  this.platform.ready().then(() => {
    this.screenshot.URI(80)
      .then((res) => {
        this.socialSharing.shareViaFacebook(null, res.URI, null)
         .then(() => {},
           () => { 
             alert('Please install Facebook app from Play store to share your Team Details.');
           });
         },
        () => {
        alert('Screenshot failed');
        });
      });

}

}


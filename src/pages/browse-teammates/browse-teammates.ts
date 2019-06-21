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
  selector: 'page-browse-teammates',
  templateUrl: 'browse-teammates.html',
})
export class BrowseTeammatesPage {

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

  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController, 
    public storage:Storage,
    public loadingCtrl:LoadingController,
    private http: Http,
    private platform: Platform,
    private socialSharing: SocialSharing,
     private screenshot: Screenshot,
    public toastCtrl:ToastController,
     public navParams: NavParams) {

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
    console.log('ionViewDidLoad BrowseTeammatesPage');
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

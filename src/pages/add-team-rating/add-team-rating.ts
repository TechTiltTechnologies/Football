import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-add-team-rating',
  templateUrl: 'add-team-rating.html',
})
export class AddTeamRatingPage {
  rating: number = 0;
  details:any;
  comments:any;
  teamData:any;
  playerData:any;
  constructor(public navCtrl: NavController,public events: Events,private http: Http, public loadingCtrl: LoadingController,public toastCtrl:ToastController,public storage:Storage, public navParams: NavParams) {
    this.teamData = navParams.get('team')
    this.details  = this.teamData.teamdetails;
      console.log(this.teamData)
      console.log(this.details)
      storage.get('playerData').then((val) => {
        this.playerData = val;
        console.log(this.playerData)
       });
    
      events.subscribe('star-rating:changed', (starRating) => {
       // console.log(starRating);
        this.rating = starRating;
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTeamRatingPage');
  }
  ratting(){
       console.log(this.rating)
       console.log(this.comments)
       console.log(this.details.team_id)
       var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    rating: this.rating,
    
    review: this.comments,

   // player_id: this.details.player_id,

    team_id: this.details.team_id,
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/insert_team_rating',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
     loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: (res.msg),
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();

    
    }    
    else
    
    {
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: 'Your Login Username or Password is invalid',
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
}

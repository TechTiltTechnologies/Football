import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { NotificationPage } from '../notification/notification';
import { StarterPage } from '../starter/starter';

@IonicPage()
@Component({
  selector: 'page-tournament-details',
  templateUrl: 'tournament-details.html',
})
export class TournamentDetailsPage {

  details:any;
  lists:any;
  awards:any;
  lefts:any;
  backgrounds = [
    '../assets/imgs/tournament_bg.png',
    '../assets/imgs/tournament_bg.png',
    
  ];
  teamDetails:any;
  playerData:any;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public storage:Storage, public navParams: NavParams,private toastCtrl: ToastController,  private http: Http,  public loading: LoadingController) {

    this.details = navParams.get('tourDetails');
    this.lists = this.details.tourDetails;
    this.awards = this.details.tourDetails[0].individual_awards;
    this.lefts = this.details.tourDetails[0].tour_teamlimit - this.details.tourDetails[0].tour_cmp_limit;
    storage.get('teamDetails').then((val) => {
      this.teamDetails = val;
       console.log(val)
   });
   storage.get('playerData').then((val) => {
    this.playerData = val;
   });
  }
  onSlideChanged(){
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentDetailsPage');
  }
  register(){

   if(this.playerData != null){
    var headers = new Headers();
      
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {

    tour_id : this.details.tourDetails[0].tour_id,
    team_id : this.teamDetails.team_id
    
    };
    console.log(data)
    let loader = this.loading.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/tournament_register',data, options)
    
    .map(res => res.json())
    
    .subscribe(res => {
  
    console.log(res)
    
    if(res.status == 200){
      loader.dismiss();
      let toast  = this.toastCtrl.create({
        message: "Booking Register Successfully",
        duration: 3000,
        position: 'bottom'
      
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();
    
    this.navCtrl.push('BookingHistoryPage');
    
    }else
    
    {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: res.msg,
        buttons: ['Ok']
      });
      alert.present();
    
    }
    
  });
  
  });
}
else{
  this.navCtrl.push(StarterPage)
}
  
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
}

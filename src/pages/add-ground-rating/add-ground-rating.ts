import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SidePage } from '../side/side';
@IonicPage()
@Component({
  selector: 'page-add-ground-rating',
  templateUrl: 'add-ground-rating.html',
})
export class AddGroundRatingPage {
  rating: number = 0;
  details:any;
  comments:any;
  ground:any;
  playerData:any;
  constructor(public navCtrl: NavController,public events: Events,private http: Http, public loadingCtrl: LoadingController,public toastCtrl:ToastController,public storage:Storage, public navParams: NavParams) {
      this.ground = navParams.get('detail')
      console.log(this.ground)
   
  
    events.subscribe('star-rating:changed', (starRating) => {
     // console.log(starRating);
      this.rating = starRating;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroundRatingPage');
  }
 ratingg(){

  
  this.storage.get('playerData').then((val) => {
    this.playerData = val;
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  player_id: this.playerData.player_id,

  ground_id : this.ground.ground_id,

  rating: this.rating,
  
  review: this.comments

  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/insert_ground_rating',data,options)
  
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

  this.navCtrl.pop()
  }    
  else
  
  {
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

});
});
});
 }
}

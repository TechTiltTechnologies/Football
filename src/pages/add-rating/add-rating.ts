import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ToastController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage} from '@ionic/storage'
@IonicPage()
@Component({
  selector: 'page-add-rating',
  templateUrl: 'add-rating.html',
})
export class AddRatingPage {
  rating: number = 0;
  details:any;
  comments:any;
  playerData:any;
  constructor(public navCtrl: NavController,public storage:Storage,private http: Http, public loadingCtrl: LoadingController,public toastCtrl:ToastController, public events: Events, public navParams: NavParams) {
   this.details = navParams.get('detials')
   console.log(this.details);
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
    console.log('ionViewDidLoad AddRatingPage');
  }
  ratting(){

     var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    rating: this.rating,
    
    review: this.comments,

    player_id: this.details.player_id,

    given_player_id : this.playerData.player_id
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/player_rating',data,options)
    
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

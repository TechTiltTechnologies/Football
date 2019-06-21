import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
import { AddRatingPage } from '../add-rating/add-rating';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SidePage } from '../side/side';
import { Platform } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage {
 
  detials:any;
  player:any;
  stars: string[] = [];
  rating:any;
  playerData:any;
  remove:any;
  isenabled:boolean=false;
  @Input() numStars: number=5;
  constructor(public navCtrl: NavController,public platform: Platform,public storage:Storage,private toastCtrl: ToastController,public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController,public viewCtrl : ViewController, public navParams: NavParams) {
    this.detials = this.navParams.get('single');
    this.playe(this.detials)
    this.rating = this.detials.player_ratings;
    storage.get('playerData').then((val) => {
      this.playerData = val;
      console.log(this.playerData)
      if(this.detials.player_id == this.playerData.player_id){
        this.isenabled=true; 
       }else{
        this.isenabled=false; 
       }
     });

   
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailsPage');
    this.star();
    
  }
  star()
  {

      let tmp = this.rating;
    //  console.log(tmp);
      for(let j=0;j<this.numStars;j++,tmp--){
        if(tmp>=1)
             {
               this.stars.push("star");
             
             }
             else if(tmp>0 && tmp<1)
             {
               this.stars.push("star-half");
             }
             else this.stars.push("star-outline");
      }
 }


playe(details){
  this.player = details;
  console.log(this.player);
  console.log(this.player.player_fname);
}
confirm(){
  this.navCtrl.push(AddRatingPage,{
    detials : this.detials
  })
}
close(){
  this.navCtrl.pop();
}
exit(){
  console.log('Hai')
  const confirm = this.alertCtrl.create({
  title: 'Exit',
    message: 'Are you confirm to exit this team?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
          const confirmm = this.alertCtrl.create({
            title: 'Information',
            message: 'If you select "ok".it is automatic logout',
            buttons: [
              // {
              //   text: 'Cance',
              //   handler: () => {
              //     console.log('Disagree clicked');
              //   }
              // },
              {
                text: 'Ok',
                handler: () => {
                  var headers = new Headers();
      
                  headers.append('Accept', 'application/json');
                  
                  headers.append('Content-Type', 'application/json' );
                  
                  let options = new RequestOptions({ headers: headers });
                  
                  let data = {
                  
                  player_id : this.detials.player_id,
                  
                  };
                  
                  let loader = this.loading.create({
                  
                  content: 'please wait…',
                  
                  });
                  console.log(data)
                  loader.present().then(() => {
                  
                  this.http.post('https://www.dev.glowup.me/football/api/exit_team',data, options)
                  
                  .map(res => res.json())
                  
                  .subscribe(res => {
                
                  console.log(res)
                  
                  if(res.status == 200){
                    loader.dismiss();
                    let toast  = this.toastCtrl.create({
                      message: (res.msg),
                      duration: 3000,
                      position: 'bottom'
                    
                    });
                  
                    toast.onDidDismiss(() => {
                      console.log('Dismissed toast');
                    });
                    
                    toast.present();
                    this.storage.set('playerData',null)
                    this.platform.exitApp();
                    
                  
                  }else
                  
                  {
                    loader.dismiss();
                    let toast  = this.toastCtrl.create({
                      message: (res),
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
            ]
          });
          confirmm.present();
          
        }
      }]
    });
    confirm.present()
}
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ValueTransformer } from '@angular/compiler/src/util';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { PaypalPage } from '../paypal/paypal';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare let paypal:any;
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  playerDetails:any;
  id:any;
  teams:any;
  empty:any;
  players:any;
  jempty:any;
  matches:any;
  joempty:any;
  splits:any;
  amempty:any;
  public payPalConfig ? : IPayPalConfig;
  constructor(public navCtrl: NavController,private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController,

    private http: Http, public loading: LoadingController,private storage: Storage) {
  
    this.addplayer();
    this.jointeamnoti();   
    this.joinfriendlymatch();
    this.splitnoti();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  addplayer(){
    this.storage.get('playerData').then((val) => {
      this.playerDetails = val;
      this.id = this.playerDetails.player_id;
     
    
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
   player_id : this.id
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/add_player_notification',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
     loader.dismiss()
     this.teams = res.data;
     console.log(this.teams)
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
      loader.dismiss();
      this.empty = "empty";
      // let toast  = this.toastCtrl.create({
      //   message: 'you dont have any notifications',
      //   duration: 3000,
      //   position: 'bottom'
      
      // });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
      
      // toast.present();
  }
  
  });
});
  });
  }

  aaccept(detail){
    console.log(detail);
    const confirmm = this.alertCtrl.create({
      title: 'Information',
      message: 'If you select "accept".it is automatic logout',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.storage.get('playerData').then((val) => {
              this.playerDetails = val;
              this.id = this.playerDetails.player_id;
              var headers = new Headers();
    
              headers.append('Accept', 'application/json');
              headers.append('Content-Type', 'application/json' );
              let options = new RequestOptions({ headers: headers });
              let data = {
                player_id : this.id,
                team_id : detail.team_id,
                at_noti_id : detail.at_noti_id,
                noti_status : "1"
              };
              console.log(data)
              let loader = this.loadingCtrl.create({
                content: 'please wait…'
              });
              loader.present().then(() => {
                this.http.post('https://www.dev.glowup.me/football/api/addplayer_accept',data,options)
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
                  } else {
                    loader.dismiss();
                  }  
                });
              });
            });
          }
        }
      ]
    });
  confirmm.present();
}

  areject(detail){
    this.storage.get('playerData').then((val) => {
      this.playerDetails = val;
      this.id = this.playerDetails.player_id;
     
    
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    player_id : this.id,

    team_id : detail.team_id,

    at_noti_id : detail.at_noti_id,

    noti_status : "2"
  
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/addplayer_accept',data,options)
    
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
      loader.dismiss();
   //   this.empty = "empty";
  }
  
  });
});
  });
  }
  jointeamnoti(){
    this.storage.get('playerData').then((val) => {
      this.playerDetails = val;

      this.id = this.playerDetails.player_id;
     
    
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
     captain_id : this.id,

     team_id : this.playerDetails.team_id
  
    };
    console.log(data)
    // let loader = this.loadingCtrl.create({
    
    // content: 'please wait…',
    
    // });
    
  //  loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/join_team_notification',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
    // loader.dismiss()
     this.players = res.data;
     console.log(this.players)
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
      this.jempty = "empty";
    
  }
  
//  });
});
});
}


jaccept(detail) {
  const confirmm = this.alertCtrl.create({
    title: 'Information',
    message: 'If you select "accept".it is automatic logout',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.storage.get('playerData').then((val) => {
          this.playerDetails = val;
          this.id = this.playerDetails.player_id;
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data = {
              player_id : detail.player_id,
              team_id : this.playerDetails.team_id,
              jt_noti_id : detail.jt_noti_id,
              jt_noti_status : "1"
            };
            console.log(data)
            let loader = this.loadingCtrl.create({
              content: 'please wait…'
            });
            loader.present().then(() => {
              this.http.post('https://www.dev.glowup.me/football/api/join_player_accept',data,options)
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
                } else {
                  loader.dismiss();
                }
              });
            });
          });
        }
      }
    ]
  });
  confirmm.present();
}

jreject(detail){
 
  this.storage.get('playerData').then((val) => {
      this.playerDetails = val;
      this.id = this.playerDetails.player_id;
      var headers = new Headers();
    
      headers.append('Accept', 'application/json');
    
      headers.append('Content-Type', 'application/json' );
    
      let options = new RequestOptions({ headers: headers });
    
      let data = {
      
        player_id : this.id,

        team_id : detail.team_id,

        jt_noti_id : detail.jt_noti_id,

        jt_noti_status : "2"

      };
      console.log(data)
      let loader = this.loadingCtrl.create({
      
        content: 'please wait…',
      
      });
  
  loader.present().then(() => {
  
    this.http.post('https://www.dev.glowup.me/football/api/join_player_accept',data,options)
  
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
    loader.dismiss();
 //   this.empty = "empty";
}

});
});
});
}
joinfriendlymatch(){
  this.storage.get('playerData').then((val) => {
    this.playerDetails = val;

    this.id = this.playerDetails.player_id;
   
  
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
   res_captain_id : this.id,

   res_team_id : this.playerDetails.team_id

  };
  console.log(data)
  // let loader = this.loadingCtrl.create({
  
  // content: 'please wait…',
  
  // });
  
//  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/invite_team_notification',data,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
  // loader.dismiss()
   this.matches = res.data;
   console.log(this.matches)
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
    this.joempty = "empty";
  
}

//  });
});
});
}
joaccept(detail){

       
  this.storage.get('playerData').then((val) => {
    this.playerDetails = val;
    this.id = this.playerDetails.player_id;
   
  
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  res_captain_id : this.playerDetails.player_id,

  req_team_id: detail.team_id,

  res_team_id : this.playerDetails.team_id,

  if_game_id : detail.if_game_id,

  res_status : "1"

  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/invite_team_accept',data,options)
  
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
    loader.dismiss();
 //   this.empty = "empty";
}

});
});
});

}

joreject(detail){
  this.storage.get('playerData').then((val) => {
    this.playerDetails = val;
    this.id = this.playerDetails.player_id;
   
  
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {

    res_captain_id : this.playerDetails.player_id,
    req_team_id: detail.team_id,
    res_team_id : this.playerDetails.team_id,
    if_game_id : detail.if_game_id,
    res_status : "2"
  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/invite_team_accept',data,options)
  
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
    loader.dismiss();
 //   this.empty = "empty";
}

});
});
});
}

splitnoti(){

  this.storage.get('playerData').then((val) => {

    this.playerDetails = val;

    this.id = this.playerDetails.player_id;
   
  
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  player_id : this.id,

  };
  console.log(data)
  // let loader = this.loadingCtrl.create({
  
  // content: 'please wait…',
  
  // });
  
//  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/players_split_payment_notification',data,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
  // loader.dismiss()
   this.splits = res.data;
   console.log(this.splits)
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
    this.amempty = "empty";
  
}

//  });
});
});
}

asplitnoti(value){

  this.navCtrl.push(PaypalPage,{
    asplit : value.split_amount,
    data:value
  })
}

rsplitreject(value){

  this.storage.get('playerData').then((val) => {
    this.playerDetails = val;
    this.id = this.playerDetails.player_id;
   
  
  var headers = new Headers();
  
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {

  noti_status : "2"

  };
  console.log(data)
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  
  loader.present().then(() => {
  
  this.http.post('https://www.dev.glowup.me/football/api/addplayer_accept',data,options)
  
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
    loader.dismiss();
 //   this.empty = "empty";
}

});
});
});
}
}

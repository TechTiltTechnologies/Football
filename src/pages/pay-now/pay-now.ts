import { Component,AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,ToastController } from 'ionic-angular';
import { Subscription, Observable } from 'rxjs';
import { NotificationPage } from '../notification/notification';
//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Color } from '@mobiscroll/angular/src/js/classes/color';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { PaypalPage } from '../paypal/paypal';
import { AddGroundRatingPage } from '../add-ground-rating/add-ground-rating';
import { BookingHistoryPage } from '../booking-history/booking-history';
import { SplitPayPage } from '../split-pay/split-pay';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-pay-now',
  templateUrl: 'pay-now.html',
})
export class PayNowPage {
  buttonActive: boolean;
  isActive:any;
  isenabled:boolean=false;
  isenable:boolean=false;
  selectSize:any;
  selecttime:any;
  details:any;
  bookedDate:any;
  teamid:any;
  playerDetails:any;
  teamDetails:any;
  players:any;
  splitamount:any;
  cash:any;
  card:any;
  playerData:any;
  selectedPlayer :any = [];
  stime:any;
  bdetails:any;
  amount:any;
  owner_id :any;
  full_payment:any;
  split_payment:any;
  clanguage:any;

  constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,public alertCtrl:AlertController, public toastCtrl:ToastController, public loadingCtrl:LoadingController, private http: Http,public storage:Storage, public navParams: NavParams) {
    this.selectSize = navParams.get('selectsize')
    this.selecttime = navParams.get('selecttime')
    this.owner_id = navParams.get('owner_id')
    this.amount = navParams.get('amount')
    this.stime = this.selecttime.join(',')
    console.log(this.selecttime.join(','))
    this.details = navParams.get('ground')
    this.bookedDate = navParams.get('selectdate')
    console.log(this.selectSize)
    
    storage.get('playerData').then((val) => {
      this.playerData = val;
     });
     storage.get('chooselanguage').then((val) => {
      this.clanguage = val;
    console.log(this.clanguage)

    if(this.clanguage == 'en')
    {
      this.platform.setDir('ltr', true);
      this.translate.use('en');
    }
    else if(this.clanguage == 'ar'){

      this.platform.setDir('rtl', true);
      this.translate.use('ar');
      
    }
    });
     
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PayNowPage');
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  payHand(){

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Are you sure to fix an appointment on    ' + this.bookedDate + '    at  ' + this.stime ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
       
   var headers = new Headers();
    
   headers.append('Accept', 'application/json');
   
   headers.append('Content-Type', 'application/json' );
   
   let options = new RequestOptions({ headers: headers });
   
   let data = {
   
   booking_player : this.playerData.player_id,
   
   booking_ground: this.details.ground_id,

   booking_sdate : this.bookedDate,

   booking_time : this.stime,

   booking_paymenttype : this.cash,

   booking_amount :  this.amount,

   ground_owner_id:this.owner_id,

   transaction_id : '0'
   };
   
   console.log(data)
   let loader = this.loadingCtrl.create({
   
   content: 'please wait…',
   
   });
   
   loader.present().then(() => {
   
   this.http.post('https://www.dev.glowup.me/football/api/insert_booking_data',data,options)
   
   .map(res => res.json())
   
   .subscribe(res => {
   
   console.log(res)
   
   
   
   if(res.status == 200){

    loader.dismiss();

    this.navCtrl.push('BookingHistoryPage');
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
       message: 'Please Check Your Network Connection',
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
alert.present();
  }
  pay(){
    //created by Dinesh
    // this.payPal.init({
    //   PayPalEnvironmentProduction: 'AVopmZrX1yfjkBxT4dUlWhsaIy4eHn0rZJ9FjvbndJrwmi8rO6ldyIxvEUcOHzajXZTyi_Z31h6UEfMQ',
    //   PayPalEnvironmentSandbox: 'AVopmZrX1yfjkBxT4dUlWhsaIy4eHn0rZJ9FjvbndJrwmi8rO6ldyIxvEUcOHzajXZTyi_Z31h6UEfMQ'
    // }).then(() => {
    //   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //     // Only needed if you get an "Internal Service Error" after PayPal login!
    //     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //   })).then(() => {
    //     let payment = new PayPalPayment('0.50', 'USD', 'Amount', 'sale');
    //     this.payPal.renderSinglePaymentUI(payment).then((success) => {
    //       console.log(success);
    //       // Successfully paid
    
    //       // Example sandbox response
    //       //
    //       // {
    //       //   "client": {
    //       //     "environment": "sandbox",
    //       //     "product_name": "PayPal iOS SDK",
    //       //     "paypal_sdk_version": "2.16.0",
    //       //     "platform": "iOS"
    //       //   },
    //       //   "response_type": "payment",
    //       //   "response": {
    //       //     "id": "PAY-1AB23456CD789012EF34GHIJ",
    //       //     "state": "approved",
    //       //     "create_time": "2016-10-03T13:33:33Z",
    //       //     "intent": "sale"
    //       //   }
    //       // }
    //     }, () => {
    //       // Error or render dialog closed without being successful
    //     });
    //   }, () => {
    //     // Error in configuration
    //   });
    // }, () => {
    //   // Error in initialization, maybe PayPal isn't supported or something else
    // });
    this.bdetails = {
      booking_player : this.playerData.player_id,
 
    booking_ground: this.details.ground_id,

    booking_sdate : this.bookedDate,

    booking_time : this.stime,

   booking_paymenttype : this.cash,

     booking_amount : this.amount
    }
    if(this.splitamount != null){
     
      this.navCtrl.push(PaypalPage,{
        split : this.splitamount,
        details:this.bdetails
      })
    }
    else{
      this.navCtrl.push(PaypalPage,{
        split : this.selectSize.ground_price,
        details:this.bdetails
      })
    }
 
  }

active(value){
  console.log(value)
if(value == "cash"){
this.cash = "cash";
this.card = null;
  this.players = null;
  this.splitamount = this.amount;
  this.isenabled=false; 
  var header = document.getElementById("myDIV");
  var btns = header.getElementsByClassName("butto");
  for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
}
else{
  this.card = "card";
  this.cash = null;
  this.isenabled=true; 
  var header = document.getElementById("myDIV");
  var btns = header.getElementsByClassName("butto");
  for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
}
  
}

split(value){

  console.log(value)

  this.split_payment = value


  console.log(this.amount)

  this.navCtrl.push(SplitPayPage,{
    amount: this.amount
    });

//   this.storage.get('playerData').then((val) => {
//     this.playerDetails = val;
//     this.teamid = this.playerDetails.team_id;
//     console.log(this.teamid)
// if(this.teamid == 0){
//   this.teamDetails = null;
// }
// else {

// var headers = new Headers();
  
// headers.append('Accept', 'application/json');

// headers.append('Content-Type', 'application/json' );

// let options = new RequestOptions({ headers: headers });

// let data = {

// team_id : this.teamid,

// };
// //console.log(data)
// let loader = this.loadingCtrl.create({

// content: 'please wait…',

// });

// loader.present().then(() => {

// this.http.post('https://www.dev.glowup.me/football/api/by_id_team_ci',data,options)

// .map(res => res.json())

// .subscribe(res => {

// // console.log(res)
// if(res.status == 200){
//  loader.dismiss()
//   this.teamDetails = res.data;
//   this.players = this.teamDetails.team_players_details
//  console.log(this.players)
// } else
// {
//   loader.dismiss()
//   let toast  = this.toastCtrl.create({
//     message: "Somthing Went Wrong.Please Try again later",
//     duration: 3000,
//     position: 'bottom'
  
//   });

//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });
  
//   toast.present();
// }

// });
// });
// }
  
// });
}

selectPlayer(data,i){
  if (data.checked == true) {
    this.isenable = true;
    this.selectedPlayer.push(data.player_id);
  }
  else {
   let newArray = this.selectedPlayer.filter(function(el) {
     return el !== data;
  });
   this.selectedPlayer = newArray;
 }
 console.log(this.selectedPlayer);
 console.log(this.selectedPlayer.length);
  //if (data.checked == true) {
    // let play = data;
    // console.log(play)
   // console.log(play.length)
   let count = this.selectedPlayer.length + 1;
    this.splitamount = (this.selectSize.ground_price/count);
   console.log(this.splitamount)
   // console.log(i)
    //console.log(data)
 // } else {
  
 // }
}



sendsplit(){
  // console.log(this.selectedPlayer);
  // console.log(this.splitamount);
  // console.log(this.playerData);
  var headers = new Headers();
  
headers.append('Accept', 'application/json');

headers.append('Content-Type', 'application/json' );

let options = new RequestOptions({ headers: headers });

let data = {

amount_spliter_id:this.playerData.player_id,

sp_player_id : this.selectedPlayer,

split_amount : this.splitamount

};
//console.log(data)
let loader = this.loadingCtrl.create({

content: 'please wait…',

});

loader.present().then(() => {

this.http.post('https://www.dev.glowup.me/football/api/split_payment_send_sms',data,options)

.map(res => res.json())

.subscribe(res => {

// console.log(res)
if(res.status == 200){
 loader.dismiss()
 let toast  = this.toastCtrl.create({
  message: "Request Send Successfull",
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
    message: "Somthing Went Wrong.Please Try again later",
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

full(value){

  console.log(value)

  this.full_payment = value
  this.players = null;
  // this.splitamount = this.details.ground_price;
  this.splitamount = this.amount
}
note(){
  let alert = this.alertCtrl.create({
    title: 'Information',
    subTitle: 'Team needs maximum 11 player to register this tournament',
    buttons: ['Ok']
  });
  alert.present();
}

terms(){

  let alert = this.alertCtrl.create({
    title: 'Cancellation Policy' ,
    subTitle:`
    <p> If the booking is cancelled:}}</p>
    <p>More than 24 hours before booking time : FREE CANCELLATION </p>
    <br>
    <p>0-24 hours before check-in date: No refund of booking charge </p>
   <p> Refund shall be initiated within 48 hours of receiving the request and the payment would be credited within 14 working days via the same mode as used while making the booking.</p>
  `,
    buttons: ['Ok']
  });
  alert.present();

}
}


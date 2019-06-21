import { Component,AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,ToastController } from 'ionic-angular';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { SidePage } from '../side/side';
//import { BookingHistoryPage } from '../booking-history/booking-history';
declare let paypal:any;
@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage implements AfterViewChecked {
  addScript :boolean = false;
  
  splitAmount:number;
  paypalLoad: boolean = true;
  finalAmount:number;
  pay:any;
  details:any;
  sdetails:any;
  playerData:any;
  public payPalConfig ? : IPayPalConfig;
  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams,public alertCtrl:AlertController, public toastCtrl:ToastController, public loadingCtrl:LoadingController, private http: Http) {
    this.splitAmount = navParams.get('split');
    if(this.splitAmount != undefined || this.splitAmount != null){
      this.finalAmount = navParams.get('split');
    }
    else{
      
      this.finalAmount = navParams.get('asplit')
    }
    this.details = navParams.get('details');
    this.sdetails =navParams.get('data');
    console.log(this.details)
  }
 


  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARse1tjreRRz4cChP_zVbNaXEM2I_PdOIWpb2vXQxo82h_u7YUF56kcfg_cjTEjbwpyAY9PenFRJtpt7',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.pay = payment;
        console.log(this.pay)
        if(payment.state == "approved"){

       if(this.details != undefined){
        var headers = new Headers();
    
        headers.append('Accept', 'application/json');
        
        headers.append('Content-Type', 'application/json' );
        
        let options = new RequestOptions({ headers: headers });
        
        let data = {
        
        booking_player : this.details.booking_player,
        
        booking_ground: this.details.booking_ground,
     
        booking_sdate : this.details.booking_sdate,
     
        booking_time : this.details.booking_time,
     
        booking_paymenttype : "card",
     
        booking_amount : this.details.booking_amount,
     
        transaction_id : this.pay.id
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
       else{
        this.storage.get('playerData').then((val) => {
          this.playerData = val;
         
        var headers = new Headers();
    
        headers.append('Accept', 'application/json');
        
        headers.append('Content-Type', 'application/json' );
        
        let options = new RequestOptions({ headers: headers });
        
        let data = {
        
        amount_spliter_id : this.sdetails.player_id,
        
        split_amount: this.sdetails.split_amount,
     
        sp_player_id : this.playerData.player_id,
     
        sp_id : this.sdetails.sp_id,
     
        sp_status : "1",
     
        };
        
        console.log(data)
        let loader = this.loadingCtrl.create({
        
        content: 'please wait…',
        
        });
        
        loader.present().then(() => {
        
        this.http.post('https://www.dev.glowup.me/football/api/split_payment_accept',data,options)
        
        .map(res => res.json())
        
        .subscribe(res => {
        
        console.log(res)
        
        
        
        if(res.status == 200){
     
         loader.dismiss();
     
         this.navCtrl.push(SidePage);
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
      });
       }
        
}
        // this.navCtrl.push('BookingHistoryPage',{
        //   paypal : this.pay
        // })
        // alert('payment successfully')
        //Do something when payment is successful.
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
  }

}

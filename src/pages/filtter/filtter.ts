import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { LocationService } from '@ionic-native/google-maps';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-filtter',
  templateUrl: 'filtter.html',
})
export class FiltterPage {
  name1="Distance";
  name2="Price";
  name3="Rating";
  icon1="pin";
  icon2="pricetag";
  icon3="star-half";
  rang:any = 0;
  min:any =0;
  selectlocation:any;
  selectrating:any;
  selectprice:any;
  locations = [
    {
  value:"Nearby"
}
]
 
costs = [ 
  {
    value : "Low to High"
  },
  {
    value : "High to Low"
  }
];

ratings = [ 
  {
    value : "Low to High"
  },
  {
    value : "High to Low"
  }
]


constructor(public navCtrl: NavController,public storage:Storage, public toastCtrl:ToastController, private http: Http,public loadingCtrl:LoadingController, public navParams: NavParams) {
  }
  locat(value){
    this.selectlocation = value;
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltterPage');
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  rate(value){
    this.selectrating = value;
  }
  cots(value){
   console.log(value)
  }
  apply(){

   this.selectprice = this.rang;
  // console.log(this.selectlocation)
   console.log(this.selectprice)
   console.log(this.selectrating);
   var headers = new Headers();
    
   headers.append('Accept', 'application/json');
   
   headers.append('Content-Type', 'application/json' );
   
   let options = new RequestOptions({ headers: headers });
   
   let value = {

     price_filter : this.selectprice,

     rating_filter : this.selectrating
 
   };
  
   let loader = this.loadingCtrl.create({
   
   content: 'please wait…',
   
   });
   console.log(value)
   loader.present().then(() => {
   
   this.http.post('https://www.dev.glowup.me/football/api/ground_filter_options',value,options)
   
   .map(res => res.json())
   
   .subscribe(res => {
   
   console.log(res)
   
  
   if(res.status == 200){

     this.storage.set('filterResult',res.data);
     this.navCtrl.push(TabsPage)
     loader.dismiss()

     

   
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
}

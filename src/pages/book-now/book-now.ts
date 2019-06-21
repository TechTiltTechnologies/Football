import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { SplitPaymentPage } from '../split-payment/split-payment';
import { FullPaymentPage } from '../full-payment/full-payment';
import {CalendarModule} from 'primeng/calendar';
import { Calendar } from '@ionic-native/calendar';
import { Subscription, Observable } from 'rxjs';
import { PayNowPage } from '../pay-now/pay-now';
import { NotificationPage } from '../notification/notification';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-book-now',
  templateUrl: 'book-now.html',
})
export class BookNowPage {
 cardinfo:any = {
  number: '',
  expMonth: '',
  expYear: '',
  cvc: ''
 }
 details:any;
 myDate:Date;
 sizes:any;
 bookdate:any;
 bookedTime:any;
 minimumDate = new Date();
 mindate = new Date();
 starttime:any;
 endtime:any;
 selectedSize:any;
 chooseTime:any;
 size:any;
 isenabled:boolean=false;
 timeslots: Array<any> = [];
 timedetails:any;
  times:any;
  grids:any = [];
  slots:any;
  gsize_id:any;
  total_amount:any;
  owner_id:any;
  sizevalue:any;
  ionicColor:any;
  buttonColor: string = '#000';
  selectedTime:any;
  buttonactive: boolean = true;
  color:string="";
  clanguage:any;
  //ischecked:boolean;

 constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,public loadingCtrl: LoadingController,private http: Http,public storage:Storage,public toastCtrl:ToastController, private calendar: Calendar,private stripe: Stripe, public navParams: NavParams) {
    this.details = this.navParams.get('grounddetails')
    this.sizes = this.details.ground_sizes_duration;
    this.owner_id = this.details.ground_owner_id
    console.log(this.details)

    
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
    console.log('ionViewDidLoad BookNowPage');
    var today = new Date().toISOString().split('T')[0];
    console.log(today)
  }

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  clikc(){
    this.stripe.setPublishableKey('pk_test_mRq8smyyCXCIKNAHchNzQOev');

// let card = {
//   number: '',
//   expMonth: '',
//   expYear: '',
//   cvc: ''
// };

this.stripe.createCardToken(this.cardinfo)
   .then(token =>{
    console.log(token.id)
   })
   .catch(error => console.error(error));
  }

  split(){
    this.navCtrl.push(SplitPaymentPage);
  }
  full(){
    this.navCtrl.push(FullPaymentPage);
  }
  itemTappedd(event, item) {
    this.bookdate = item.getDate()+ '/' + (item.getMonth() + 1) + '/' + item.getFullYear() 
    //this.bookdate = item.getFullYear() + '/' + (item.getMonth() + 1) + '/' + item.getDate()

    this.myDate = item;
    let day = item.getDay()
    console.log()
    if(day == 0){
        day = "Sunday"
    }else if(day == 1){
      day = "Monday"
    }else if(day == 2){
      day = "Tuesday"
    }else if(day == 3){
      day = "Wednesday"
    }else if(day == 4){
      day = "Thursday"
    }else if(day == 5){
      day = "Friday"
    }else if(day == 6){
      day = "Saturday"
    }
    else{
      day="empty"
    }
    console.log(this.bookdate)
  //   var headers = new Headers();
    
  //   headers.append('Accept', 'application/json');
    
  //   headers.append('Content-Type', 'application/json' );
    
  //   let options = new RequestOptions({ headers: headers });
    
  //   let value = {

  //     ground_id : this.details.ground_id,

  //     booking_date : this.bookdate,

  //     ground_size_id: this.gsize_id
  
  //   };
   
  //   let loader = this.loadingCtrl.create({
    
  //   content: 'please wait…',
    
  //   });
  //   console.log(value)
  //   loader.present().then(() => {
    
  //   this.http.post('https://www.dev.glowup.me/football/api/get_ground_openclose_time',value,options)
    
  //   .map(res => res.json())
    
  //   .subscribe(res => {
    
  //   console.log(res)
    
   
  //   if(res.status == 200){

  //     this.times = res.data
  //     console.log(this.times)
  //     loader.dismiss()

    
  //   } else
    
  //   {

  //     loader.dismiss()
  //     let toast  = this.toastCtrl.create({
  //       message: 'Please Try again later',
  //       duration: 3000,
  //       position: 'bottom'
      
  //     });
    
  //     toast.onDidDismiss(() => {
  //       console.log('Dismissed toast');
  //     });
      
  //     toast.present();
  
  // }
  
  // });
  
  // });
   }

  
  
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  // infrm(){
  //   console.log(this.grids)
  //   if(!this.grids){
  //     let toast  = this.toastCtrl.create({
  //       message: 'Please scroll down to see the selected times',
  //       duration: 3000,
  //       position: 'bottom'
      
  //     });
    
  //     toast.onDidDismiss(() => {
  //       console.log('Dismissed toast');
  //     });
      
  //     toast.present();
  //   }

  // }
  selectSize(index,value){

    //this.color="red";

   // this.buttonactive = false

    console.log(this.bookdate)

    console.log("val"+value)
    this.sizevalue = "dummysize"

    this.size = value;
    this.selectedSize = this.size;
    console.log(this.selectedSize);

    // if(this.starttime == undefined){
    //   console.log('checking')
    //   this.ischecked = true

    // }

    //this.total_amount = this.selectedSize.ground_price
    //console.log("totalamount"+this.total_amount)
    console.log("size"+this.selectedSize.discount_price)
    this.gsize_id = this.selectedSize.id
    this.total_amount = this.selectedSize.discount_price

    //this.isOutline=true;

  //   if ( this.starttime != undefined && this.selectedSize.discount_price != undefined){
  //     this.isenabled=true; 
  //     console.log('time'+this.starttime)
  //     console.log('sizee'+this.selectedSize.discount_price)
    
  // }
  // else{
  //   this.isenabled=false; 
  //   console.log('bye')
  // }

  if(this.bookdate == undefined){
    let toast  = this.toastCtrl.create({
      message: 'Please Enter your date for booking',
      duration: 3000,
      position: 'bottom'
    
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

  }

  else{

    this.calltimeAPi();
  }
  
  }
  calltimeAPi() {
    
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {

      ground_id : this.details.ground_id,

      booking_date : this.bookdate,

      ground_size_id: this.gsize_id
  
    };
   
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    console.log(data)
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/get_ground_openclose_time',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
   
    if(res.status == 200){

      this.times = res.data
      console.log(this.times)
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

  selectTime(index, value) {
    const isValidIndex = this.timeslots.findIndex(timeslot => timeslot === value);
    if (isValidIndex === -1) {
      this.timeslots.push(value);
    
    } else {
      this.timeslots = this.timeslots.filter(timeslot => timeslot !== value)
     
    }

    console.log(isValidIndex)

    if(isValidIndex === -1 || isValidIndex > 0 ){
      console.log(isValidIndex)
      this.isenabled = true
    }

    else if(isValidIndex === 0){
      console.log('1')
      this.isenabled = false
    }

    console.log('kosalram', this.timeslots);
  
  }

  slotSelected(value) {
    let doesSlotSelected = false;
    const isValidIndex = this.timeslots.findIndex(timeslot => timeslot === value);
    if (isValidIndex > -1) {
      //console.log('1')
      doesSlotSelected = true && this.timeslots.length > 0;
      //this.isenabled = true
    }
    return doesSlotSelected;
  }

  // slotSelectedsize(value) {
  //   let doesSlotSelected = false;
   
  //   if (this.selectedSize > -1) {
  //     //console.log('1')
  //     doesSlotSelected = true && this.selectedSize.length > 0;
  //     //this.isenabled = true
  //   }
  //   return doesSlotSelected;
  // }
  
   
//   selectTime(index, value) {

//     console.log('kosal', value)

//     //value.active = !value.active;
//     this.selectedTime = value;
   
//     this.starttime = value;
    
// //     if(this.times[index+1] != undefined){
// //     this.endtime =  this.times[index+1];
// //     }else{
// //     this.endtime = "Closed";
// //      }

// // //this.chooseTime = value;
// //      this.chooseTime = this.starttime+ " to " + this.endtime;
//      if(index =! null){ 
//       this.grids.push(this.starttime);
//     }
//     else{
//      let newArray = this.grids.filter(function(el) {
//       return el !== this.starttime;
//    });
//    this.grids = newArray;
//   }
//   if(this.grids[0] == value){
//     let toast  = this.toastCtrl.create({
//             message: 'Please scroll down to see the selected times',
//             duration: 3000,
//             position: 'bottom'
          
//           });
        
//           toast.onDidDismiss(() => {
//             console.log('Dismissed toast');
//           });
          
//           toast.present();
//   }
//    console.log(this.grids);
//    this.slots = this.grids.length;

   
//    if ( this.starttime != undefined && this.selectedSize.discount_price != undefined){
//     this.isenabled=true; 
//     console.log('time'+this.starttime)
//     console.log('sizee'+this.selectedSize.discount_price)
  
// }
// else{
//   this.isenabled=false; 
//   console.log('bye')
// }
//   }

  ttimes(index,value){
   console.log(index);
   console.log(value);
  (this.grids).splice(index,1);
   this.slots = this.grids.length;
  
   
}
  active(){
    console.log('hai')
  var header = document.getElementById("myDIV");
  var btns = header.getElementsByClassName("butto");
  for (var i = 0; i < btns.length; i++) {
    console.log(btns.length)
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = btns[0].className.replace(" active", "");
  this.className += " active";
  });
}
  }

  pay()
  {

    this.navCtrl.push(PayNowPage,{
      selectsize : this.selectedSize,
      selecttime : this.timeslots,
      ground : this.details,
      amount : this.total_amount,
      owner_id : this.owner_id,
      selectdate : this.bookdate

   });
  //   if (this.chooseTime == "" && this.selectedSize == ""){
  //     console.log('in')
  //   this.isenabled=true; 
  //   this.navCtrl.push(PayNowPage,{
  //      selectsize : this.selectedSize,
  //      selecttime : this.chooseTime,
  //      ground : this.details,
  //      selectdate : this.bookdate

  //   });
  // }
  // else{
  //   console.log('out')
  //   this.isenabled=false; 
  //   let toast  = this.toastCtrl.create({
  //     message: 'Please select Time and Ground size',
  //     duration: 3000,
  //     position: 'bottom'
    
  //   });
  
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
    
  //   toast.present();
  // }

  
  }
}

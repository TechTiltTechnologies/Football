import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams,Slides,AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AddressViewPage } from '../address-view/address-view';
import { TooltipsModule } from 'ionic-tooltips';
import { BookNowPage } from '../book-now/book-now'
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import { NotificationPage } from '../notification/notification';
import { StarterPage } from '../starter/starter';
let now = new Date();
import { Storage } from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core';
import { AddGroundRatingPage } from '../add-ground-rating/add-ground-rating';


@IonicPage()
@Component({
  selector: 'page-stadiumdetails',
  templateUrl: 'stadiumdetails.html',
})
export class StadiumdetailsPage {

  date: any = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  details:any;
  sizes:any;
  durations:any;
  extras:any;
  water:any;
  unwater:any;
  jersy:any;
  unjersy:any;
  shower:any
  unshower:any;
  indoor:any;
  unindoor:any;
  discount_price:any;
  normal_price:any;
  owner_id:any;

  public datee: string = new Date().toISOString();

  @ViewChild('scroller') scroller: Slides;
  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  @Input() numStars: number=5;
  
 slides:any;
 onlinebook:any;
  selecttime:any;
  cmdetails:any;
  stars: string[] = [];
  rating:any;
  callbook:any;
  clanguage:any;
  constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,private callNumber: CallNumber,public storage:Storage,public modalCtrl: ModalController,public alertCtrl:AlertController, public navParams: NavParams,private calendar: Calendar) {
 this.details = this.navParams.get('grounddetails');
 this.rating = this.details.rating;

 console.log(this.rating)
 
 this.sizes = this.details.ground_sizes_duration;
 console.log("sizes",this.sizes)
 this.onlinebook = this.details.online_booking;
 console.log(this.onlinebook)
 if(this.onlinebook == 1){
   this.callbook = "yes"
 }
 console.log(this.callbook)
 this.extras = this.details.ground_facilities;
 this.slides = this.details.ground_image_url;
 this.discount_price = this.details.discount_price;
 this.normal_price = this.details.ground_price;
 this.owner_id = this.details.ground_owner_id;

 console.log("owner"+this.owner_id)

 console.log(this.discount_price)
 console.log(this.normal_price)
 console.log(this.slides)
 storage.get('playerData').then((val) => {
  this.cmdetails = val;
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
  console.log('1')
  this.translate.use('ar');
 // console.log('11')
  
}
});

//  for(let i =0;i < this.extras.length;i++){
//    if(this.extras[i].facility_name == "Water"){
//     this.water = this.extras[i].facility_name
//    }
//    else if(this.extras[i].facility_name == "Rest room") {
//     this.shower = this.extras[i].facility_name;
//    }
//    else if(this.extras[i].facility_name == "jersy"){
//     this.jersy = this.extras[i].facility_name;
//    }
//   else{
//     this.unwater = "unwater";
//     this.unindoor = "unindoor";
//     this.unjersy = "unjersy"
//     this.unshower = "unshower"
//   }
//  }
 console.log(this.details);
 this.star();
  }
  ratingg(){
    this.navCtrl.push(AddGroundRatingPage,{
      detail : this.details
    })
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad StadiumdetailsPage');
    
  }
  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    //console.log('Slide changed! Current index is', this.slideIndex);
  }


  itemTapped(event, item) {

    this.selecttime = item;
    console.log(this.selecttime);
  }

  address() {
    // let alert = this.alertCtrl.create({
    //   title: 'Address',
    //   subTitle: 'No:19,West Street,Abu Dhabi - 874169',
    //   cssClass: 'map',
    //   buttons: ['ok']
    // });
    // alert.present();
    let modal = this.modalCtrl.create(AddressViewPage,{
      lat : this.details.ground_lat,
      lng: this.details.ground_long
    });
    modal.present();
  }
  booknow(){
    if(this.cmdetails != null){
      this.navCtrl.push(BookNowPage,{
        grounddetails:this.details
       });
    }
    else{
      //this.navCtrl.push(StarterPage)
      this.navCtrl.setRoot(StarterPage)


    }
      
  }
  notify(){
    this.navCtrl.push(NotificationPage);
  }
  callnow(){

    this.callNumber.callNumber('8341774432', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }
}

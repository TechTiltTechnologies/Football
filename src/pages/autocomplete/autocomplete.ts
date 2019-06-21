import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { HomePage } from '../home/home';
import { SidePage } from '../side/side';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any
  service = new google.maps.places.AutocompleteService();

  lat:any;
  lng:any;
  locality:any = [];
  sublocality:any = [];
  local:any;
  sublocal:any;
  locationData = null;
  constructor(public navCtrl: NavController,private toastCtrl:ToastController,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {

    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    componentRestrictions: {
      country: 'IN'
    }
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    //alert("lat: " + this.latitude + ", long: " + this.longitude);
   });
 }

 getlocation(){
   console.log("in")
  this.geolocation.getCurrentPosition().then((pos) => {
    this.lat = pos.coords.latitude
    this.lng = pos.coords.longitude

    window.localStorage.setItem('clat',this.lat);
    window.localStorage.setItem('clng',this.lng);
     this.locaton();
    
   }).catch((error) => {
     console.log(error);
    let toast  = this.toastCtrl.create({
      message: ('Please Turn on Your Location'),
      duration: 5000,
      position: 'bottom'
    
    });
  //  loader.dismiss()
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
   }).catch( err => console.log(err));
 }
 locaton(){
  let lat;
  let lng;
   lat = window.localStorage.getItem('clat');
    lng =    window.localStorage.getItem('clng');
    console.log(this.lat);
    //console.log(pos.coords.longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  //this.enableLocation();
  this.nativeGeocoder.reverseGeocode(lat, lng)
    .then((result: NativeGeocoderReverseResult[]) => {
     // this.sublocality = JSON.stringify(result[0].subLocality);
      this.locality = JSON.stringify(result[0].locality);
  
    //  this.local = this.locality.replace(/['"]+/g, '');
    
      this.sublocal = this.sublocality.replace(/['"]+/g, '');
    
     
    }).catch((error: any) => console.log(error));
  
    this.locationData = {
  
      local: [ this.sublocal]
     };

      this.navCtrl.push(SidePage,{
       locationData:this.locationData
       });
console.log(this.sublocal);
  }
}

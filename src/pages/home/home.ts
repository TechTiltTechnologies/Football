import { Component,ViewChild,AfterViewChecked } from '@angular/core';
import { IonicPage, NavController,ActionSheetController, NavParams,Select,AlertController,ToastController,ModalController,MenuController   } from 'ionic-angular';
import{ SidePage } from '../side/side';
import { RegisterPage } from '../register/register';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { StadiumdetailsPage } from '../stadiumdetails/stadiumdetails';
import { NotificationPage } from '../notification/notification';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { SearchPage } from '../search/search';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';

import { AutocompletePage } from '../autocomplete/autocomplete';
import { TranslateService } from '@ngx-translate/core';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { CompileStylesheetMetadata } from '@angular/compiler';
import { Subscription, Observable } from 'rxjs';
import { Network } from '@ionic-native/network';
import { FiltterPage } from '../filtter/filtter';
//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { errorHandler } from '@angular/platform-browser/src/browser';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage  {

  lat:any;
  lng:any;
  address;
  locality:any = [];
  sublocality:any = [];
  local:any;
  sublocal:any;
  Gdetails:any;
  Glocations:any;
  grounds:any;
  cityy:any;
  playerData:any;
  grounddetails:any;
  selectlocation:any;
  locations:any;
  clanguage:any;
  @ViewChild('city') city;
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  state = null;
  stateIds = [];
  states:any = [];
  rating: number = 4;
  empty:any;
  elanguage:any;
  alanguage:any;

 
  public isSearchbaropened = false;
  constructor(public navCtrl: NavController,public translate: TranslateService,public platform: Platform,public actionSheetCtrl: ActionSheetController,private network: Network,public menuCtrl:MenuController, public loadingCtrl: LoadingController,public rest:RestApiProvider,private ModalCtrl:ModalController,private diagnostic: Diagnostic,private locationAccuracy: LocationAccuracy,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation, public navParams: NavParams,private alertCtrl: AlertController
    ,private toastCtrl: ToastController,private http: Http,public storage:Storage) {
      this.address = {
        place: ''
      };
      this.rating;
     
     this.getgroundLocation();
     storage.get('playerData').then((val) => {
     this.playerData = val;
    });

    storage.get('filterResult').then((val) => {
      let filterResult = val;
      if(filterResult == null){
        this.getgroundlist();
      }else{
        this.grounds = filterResult;

      }
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

 

  getgroundlist(){
    this.storage.set('filterResult',null);
    let loader = this.loadingCtrl.create({
 
      content: 'please wait…',
      
      });
      
      loader.present().then(() => {
    this.rest.getGround()
    .then(data => {

      loader.dismiss()
      this.Gdetails = data;
      if( this.Gdetails.status == 500){
       this.empty = "empty"
      }else{
        this.grounds = this.Gdetails.data;
        console.log(this.grounds)
        //console.log("discount"+this.grounds[0].ground_discount)

      }
      
    });
    
  });
  }

  getgroundLocation(){
    this.rest.getLocation()
    .then(data => {
      this.Glocations = data;
      this.locations = this.Glocations.data;
      console.log(this.locations)
    });
  }

  openMenu() {
    console.log('Hai')
    this.menuCtrl.open();
  }  

 showAddressModal () {
    let modal = this.ModalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    
    modal.present();
   
  }


  stateChanged(event: { component: SelectSearchableComponent, value: any}) {
    // User was selected
  }
 
  onClose() {
    let toast = this.toastCtrl.create({
      message: 'Thanks for your selection',
      duration: 2000
    });
    toast.present();
  }
 
  openFromCode() {
    this.selectComponent.open();
  }

  ionViewDidLoad() {

 //   this.enableLocation();
 this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos) => {
  this.lat = pos.coords.latitude
  this.lng = pos.coords.longitude

  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};
//this.enableLocation();
this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude,options)
  .then((result: NativeGeocoderReverseResult[]) => {
  
    this.sublocality = JSON.stringify(result[0].subLocality);
    this.locality = JSON.stringify(result[0].locality);
    console.log(JSON.stringify(result[0]))
    console.log(this.sublocality);

    this.local = this.locality.replace(/['"]+/g, '');
    console.log(this.local);
    this.sublocal = this.sublocality.replace(/['"]+/g, '');
      console.log(this.sublocal);
   
  }).catch((error: any) => console.log(error));


   console.log(pos)
  
 }).catch((error) => {
  // console.log(error);
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

//get Location
    //  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
     
    //   if(canRequest) {
    //   // the accuracy option will be ignored by iOS
    //   this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //   () => {
    //     console.log('Request successful')
    //     this.locaton();
    //   } ,
    //   error => {
    //     console.log(error);
    //     let toast  = this.toastCtrl.create({
    //       message: ('Please Turn on Your Location'),
    //       duration: 5000,
    //       position: 'bottom'
        
    //     });
    //   //  loader.dismiss()
    //     toast.onDidDismiss(() => {
    //       console.log('Dismissed toast');
    //     });
        
    //     toast.present();
    //   });
    //   }
    //   this.locaton();
    //   });



    console.log('ionViewDidLoad HomePage');

   }
   selectCountry(i,value){

  console.log(value)
 
    var headers = new Headers();
    
    headers.append('Accept', 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    ground_city : value
   
    };
    console.log(data)
    let loader = this.loadingCtrl.create({
    
    content: 'please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('https://www.dev.glowup.me/football/api/grounds_list_based_on_location',data,options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    console.log(res)
    
    
    
    if(res.status == 200){
     // window.localStorage.setItem('response',res);

     loader.dismiss()
    this.grounds = res.data;
    
    
    } else
    
    {
      loader.dismiss()
      let toast  = this.toastCtrl.create({
        message: 'No Data Found',
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

   locaton(){
    let lat;
    let lng;
     lat = window.localStorage.getItem('clat');
      lng =    window.localStorage.getItem('clng');
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
    
        this.local = this.locality.replace(/['"]+/g, '');
        console.log(this.local);
      //  this.sublocal = this.sublocality.replace(/['"]+/g, '');
       
      }).catch((error: any) => console.log(error));
    
      console.log(this.local);
    }

//later need

// enableLocation() {
// this.locationAccuracy.canRequest().then((canRequest: boolean) => {

// if(canRequest) {
// // the accuracy option will be ignored by iOS
// this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
// () => {
//   console.log('Request successful')
//  // this.getLocation();
// } ,
// error => alert('Error requesting location permissions'+JSON.stringify(error))
// );
// }

// });
// }

stadium(i,val){
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {

   ground_id:val.ground_id

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {

  this.http.post('https://www.dev.glowup.me/football/api/grounds_details_based_on_id',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
  
    loader.dismiss()
  

    this.grounddetails = {
      grounddetails : res.data
    };

       this.navCtrl.push(StadiumdetailsPage,{
       grounddetails:res.data,
      })
  
  } else
  
  {
    loader.dismiss()
  
}

});

});
 // this.navCtrl.push(StadiumdetailsPage);
}

notify(){
  this.navCtrl.push(NotificationPage);
}

// search(){
//   this.navCtrl.push(SearchPage);
// }


filtter(){
  //this.navCtrl.push(FiltterPage);
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Sort by',
    buttons: [
      {
        
        text: 'Nearby',
        handler: () => {
          var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {

   sort_price:"4",

   lat : this.lat,

   long : this.lng

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {

  this.http.post('https://www.dev.glowup.me/football/api/price_sorting',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
    
    loader.dismiss()
    this.grounds = res.data;

  
  } else
  
  {
    loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: 'Please check your Network Connection',
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
      },{
        text: 'Price -- Low to High',
        handler: () => {
  var headers = new Headers();
    
  headers.append('Accept', 'application/json');
  
  headers.append('Content-Type', 'application/json' );
  
  let options = new RequestOptions({ headers: headers });
  
  let value = {

   sort_price:"1"

  };
 
  let loader = this.loadingCtrl.create({
  
  content: 'please wait…',
  
  });
  console.log(value)
  loader.present().then(() => {

  this.http.post('https://www.dev.glowup.me/football/api/price_sorting',value,options)
  
  .map(res => res.json())
  
  .subscribe(res => {
  
  console.log(res)
  
  
  
  if(res.status == 200){
    
    loader.dismiss()
    this.grounds = res.data;

  
  } else
  
  {
    loader.dismiss()
    let toast  = this.toastCtrl.create({
      message: 'Please check your Network Connection',
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
      },
      {
        text: 'Price -- High to Low',
        handler: () => {
          var headers = new Headers();
    
          headers.append('Accept', 'application/json');
          
          headers.append('Content-Type', 'application/json' );
          
          let options = new RequestOptions({ headers: headers });
          
          let value = {
        
           sort_price:"2"
        
          };
         
          let loader = this.loadingCtrl.create({
          
          content: 'please wait…',
          
          });
          console.log(value)
          loader.present().then(() => {
        
          this.http.post('https://www.dev.glowup.me/football/api/price_sorting',value,options)
          
          .map(res => res.json())
          
          .subscribe(res => {
          
          console.log(res)
          
          
          
          if(res.status == 200){
            
            loader.dismiss()
            this.grounds = res.data;
        
          
          } else
          
          {
            loader.dismiss()
            let toast  = this.toastCtrl.create({
              message: 'Please check your Network Connection',
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
      },
      {
        text: 'Popularity',
        handler: () => {
          var headers = new Headers();
    
          headers.append('Accept', 'application/json');
          
          headers.append('Content-Type', 'application/json' );
          
          let options = new RequestOptions({ headers: headers });
          
          let value = {
        
           sort_price:"3"
        
          };
         
          let loader = this.loadingCtrl.create({
          
          content: 'please wait…',
          
          });
          console.log(value)
          loader.present().then(() => {
        
          this.http.post('https://www.dev.glowup.me/football/api/price_sorting',value,options)
          
          .map(res => res.json())
          
          .subscribe(res => {
          
          console.log(res)
          
          
          
          if(res.status == 200){
            
            loader.dismiss()
            this.grounds = res.data;
        
          
          } else
          
          {
            loader.dismiss()
            let toast  = this.toastCtrl.create({
              message: 'Please check your Network Connection',
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
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
//paypal


pay(){

  
  //created by Dinesh
  // this.payPal.init({
  //   PayPalEnvironmentProduction: '',
  //   PayPalEnvironmentSandbox: 'AVopmZrX1yfjkBxT4dUlWhsaIy4eHn0rZJ9FjvbndJrwmi8rO6ldyIxvEUcOHzajXZTyi_Z31h6UEfMQ'
  // }).then(() => {
  //   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
  //       acceptCreditCards: true,
  //       languageOrLocale: 'en_US',
  //       merchantName: 'FE3RNB58ZCKVW',
  //       merchantPrivacyPolicyURL: 'https://www.paypal.com/in/webapps/mpp/ua/privacy-full',
  //       merchantUserAgreementURL: 'https://www.paypal.com/in/webapps/mpp/ua/useragreement-full'
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
  //     }, (err) => {
  //       console.log(err); // Error or render dialog closed without being successful
  //     });
  //   }, (err) => {
  //     console.log(err); // Error in configuration
  //   });
  // }, (err) => {
  //   console.log(err);   // Error in initialization, maybe PayPal isn't supported or something else
  // });

}
}

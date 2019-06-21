import { SplitPayPage } from './../pages/split-pay/split-pay';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SidePage } from '../pages/side/side';
import { Storage } from '@ionic/storage';
import { StarterPage } from '../pages/starter/starter'
import { TranslateService } from '@ngx-translate/core';
import { FcmProvider } from './../providers/fcm/fcm.provider';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
    //rootPage:any = LoginPage;
    checked = null;;
    clanguage = null;

  constructor(platform: Platform,storage:Storage, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService,fcm : FcmProvider,toastCtrl: ToastController) {

    translate.setDefaultLang('en');
      storage.get('checked').then((val)=>{
        this.checked = val;
        if(this.checked == null || this.checked == ""){
          this.rootPage = StarterPage;
        }else{
          this.rootPage = SidePage;
        }
      });

      // storage.get('chooselanguage').then((val) => {
      //   this.clanguage = val;
      // console.log(this.clanguage)
      // });

      // storage.set('languagesetting',this.clanguage)
     
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //Get Token
      fcm.getToken();
      console.log("TOKEN RECIEVED");
      fcm.listenToNotifications().pipe(
        tap(msg => {
          console.log(msg);
          const toast = toastCtrl.create({
            message: msg['body'],
            duration: 3000
          });
          toast.present();
        })
      ).subscribe();

      //push notification
    //   var notificationOpenedCallback = function(jsonData) {
    //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //   };
  
    //   window["plugins"].OneSignal
    //     .startInit("4e7ad180-f991-49da-812e-d2143428e0d8", "YOUR_GOOGLE_PROJECT_NUMBER_IF_ANDROID")
    //     .handleNotificationOpened(notificationOpenedCallback)
    //     .endInit();
    });
  }
}


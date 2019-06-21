import { DummyloaderPage } from './../dummyloader/dummyloader';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SidePage } from '../side/side';


@IonicPage()
@Component({
  selector: 'page-language-settings',
  templateUrl: 'language-settings.html',
})
export class LanguageSettingsPage {

  getlanguage:any;
  isChecked :boolean ;
  isCheckedd:boolean;
  clanguage:any;

  constructor(public platform: Platform,private storage: Storage,public translateService:TranslateService,public navCtrl: NavController, public navParams: NavParams) {

    storage.get('chooselanguage').then((val) => {
      this.clanguage = val;
    console.log(this.clanguage)

    if(this.clanguage == 'ar')
    {
      this.isChecked = false
      this.isCheckedd = true
    }
    else if(this.clanguage == 'en'){
      this.isChecked = true
      this.isCheckedd = false
    }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguageSettingsPage');
  }

  changeLanguage(langauge){
    this.translateService.use(langauge);
    console.log(langauge)
    this.getlanguage = langauge

    if(this.getlanguage == 'ar')
    {
      console.log('2')

   this.storage.set('chooselanguage',this.getlanguage)
     
      this.platform.setDir('rtl', true);
      this.navCtrl.push(DummyloaderPage)
    }
    else if(this.getlanguage == 'en')
    {
      console.log('1')
     
      this.storage.set('chooselanguage',this.getlanguage)
      this.platform.setDir('ltr', true);
      this.navCtrl.push(DummyloaderPage)
    }
  
    //this.storage.set('getlanguage',langauge)
    }

}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { TranslateModule,  TranslateLoader,TranslateService } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';
 import { HttpClientModule, HttpClient } from '@angular/common/http';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    HttpModule,HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
        }
    })
  ],
})
export class TabsPageModule {}

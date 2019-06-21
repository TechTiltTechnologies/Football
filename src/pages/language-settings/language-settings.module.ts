import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageSettingsPage } from './language-settings';

@NgModule({
  declarations: [
    LanguageSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageSettingsPage),
  ],
})
export class LanguageSettingsPageModule {}

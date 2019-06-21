import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressViewPage } from './address-view';

@NgModule({
  declarations: [
    AddressViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressViewPage),
  ],
})
export class AddressViewPageModule {}

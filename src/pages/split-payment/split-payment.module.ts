import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitPaymentPage } from './split-payment';

@NgModule({
  declarations: [
    SplitPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitPaymentPage),
  ],
})
export class SplitPaymentPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaypalPage } from './paypal';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    PaypalPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(PaypalPage),
  ],
})
export class PaypalPageModule {}

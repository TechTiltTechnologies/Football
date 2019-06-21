import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingGroundDetailsPage } from './booking-ground-details';

@NgModule({
  declarations: [
    BookingGroundDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingGroundDetailsPage),
  ],
})
export class BookingGroundDetailsPageModule {}

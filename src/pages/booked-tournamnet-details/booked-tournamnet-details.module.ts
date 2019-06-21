import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedTournamnetDetailsPage } from './booked-tournamnet-details';

@NgModule({
  declarations: [
    BookedTournamnetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedTournamnetDetailsPage),
  ],
})
export class BookedTournamnetDetailsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookNowPage } from './book-now';

@NgModule({
  declarations: [
    BookNowPage,
  ],
  imports: [
    IonicPageModule.forChild(BookNowPage),
  ],
  exports:[
    BookNowPage
  ]
})
export class BookNowPageModule {}

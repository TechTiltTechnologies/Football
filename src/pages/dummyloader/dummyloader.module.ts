import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DummyloaderPage } from './dummyloader';

@NgModule({
  declarations: [
    DummyloaderPage,
  ],
  imports: [
    IonicPageModule.forChild(DummyloaderPage),
  ],
})
export class DummyloaderPageModule {}

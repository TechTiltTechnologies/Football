import { DummyloaderPage } from './../pages/dummyloader/dummyloader';
import { FullteamPage } from './../pages/fullteam/fullteam';
import { BrowseTeammatesPage } from './../pages/browse-teammates/browse-teammates';
import { BrowseTeamPage } from './../pages/browse-team/browse-team';
import { SplitPayPage } from './../pages/split-pay/split-pay';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { RegisterPage } from '../pages/register/register';
import { SidePage } from '../pages/side/side';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { StadiumdetailsPage } from '../pages/stadiumdetails/stadiumdetails';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
//import { TabsPage } from '../pages/tabs/tabs';
//import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { MbscModule } from '@mobiscroll/angular';
import { AboutPage } from '../pages/about/about';
import { FaqPage } from '../pages/faq/faq';
import { TermsPage } from '../pages/terms/terms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForgetPage } from '../pages/forget/forget';
import { GooglePlus } from '@ionic-native/google-plus';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
import { SearchPage } from '../pages/search/search';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CommonModule } from '@angular/common';
import { Calendar } from '@ionic-native/calendar';
import { AgmCoreModule } from '@agm/core';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
//import { BookingHistoryPage } from '../pages/booking-history/booking-history';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AddressViewPage } from '../pages/address-view/address-view';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookNowPage } from '../pages/book-now/book-now';
import { Stripe } from '@ionic-native/stripe';
import { CreateTeamPage } from '../pages/create-team/create-team';
import { MyTeamPage } from '../pages/my-team/my-team';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { TournamentListPage } from '../pages/tournament-list/tournament-list';
import { TournamentDetailsPage } from '../pages/tournament-details/tournament-details';
import { JoinFriendlyPage } from '../pages/join-friendly/join-friendly';
import { OtherTeamPage } from '../pages/other-team/other-team';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { IonicStorageModule } from '@ionic/storage';
import { AddPlayersPage } from '../pages/add-players/add-players';
import { SplitPaymentPage } from '../pages/split-payment/split-payment'
import { FullPaymentPage } from '../pages/full-payment/full-payment'
import { JoinFriendlyMatchPage } from '../pages/join-friendly-match/join-friendly-match';
import { BookedTournamnetDetailsPage } from '../pages/booked-tournamnet-details/booked-tournamnet-details'
import { TwoTeamPage } from '../pages/two-team/two-team';
import { StarterPage } from '../pages/starter/starter';
import { StartJourneyPage } from '../pages/start-journey/start-journey';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                 //api
import { PayNowPage } from '../pages/pay-now/pay-now';
import { NgProgressModule } from 'ngx-progressbar';
import { Network } from '@ionic-native/network';
import { StarRatingModule } from 'ionic3-star-rating';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PlayerDetailsPage } from '../pages/player-details/player-details'
import { AddRatingPage } from '../pages/add-rating/add-rating';
import { FiltterPage } from '../pages/filtter/filtter';
import { AccordianComponent } from '../components/accordian/accordian';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FilePath } from '@ionic-native/file-path';
import { AddTeamRatingPage } from '../pages/add-team-rating/add-team-rating';
import { PaypalPage } from '../pages/paypal/paypal';
import { Screenshot } from '@ionic-native/screenshot';
import { CallNumber } from '@ionic-native/call-number';
import { NgxPayPalModule } from 'ngx-paypal';
import { AddGroundRatingPage } from '../pages/add-ground-rating/add-ground-rating';
import { BookingGroundDetailsPage } from '../pages/booking-ground-details/booking-ground-details';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageSettingsPage } from '../pages/language-settings/language-settings'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from './../providers/fcm/fcm.provider';
//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    RegisterPage,
    SidePage,
    StadiumdetailsPage,
    NotificationPage,
    ProfilePage,
    SplitPayPage,
    FullteamPage,
    DummyloaderPage,
    LanguageSettingsPage,
    BrowseTeamPage,
    BrowseTeammatesPage,
    //MatProgressBarModule,
    AboutPage,
    FaqPage,
    TermsPage,
    ForgetPage,
    ParallaxHeaderDirective,
    SearchPage, AutocompletePage,
    //BookingHistoryPage,
    AddressViewPage,
    BookNowPage,
    CreateTeamPage,
    MyTeamPage,
    TournamentListPage,
    TournamentDetailsPage,
    JoinFriendlyPage,
    OtherTeamPage,
    EditProfilePage,
    AddPlayersPage,
    SplitPaymentPage,
    FullPaymentPage,
    JoinFriendlyMatchPage,
    BookedTournamnetDetailsPage,
    TwoTeamPage,
    StarterPage,
    StartJourneyPage,
    PayNowPage,
    PlayerDetailsPage,
    AddRatingPage,
    FiltterPage,
    AccordianComponent,
    AddTeamRatingPage,
    PaypalPage,
    AddGroundRatingPage,
    BookingGroundDetailsPage
  ],
  imports: [
    BrowserModule, StarRatingModule, HttpModule, CalendarModule, HttpClientModule, SelectSearchableModule, MbscModule, HttpModule, TooltipsModule, BrowserAnimationsModule,
    CommonModule, ReactiveFormsModule,
    FormsModule, NgProgressModule,
    NgxPayPalModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    RegisterPage,
    SidePage,
    StadiumdetailsPage,
    NotificationPage,
    ProfilePage,
    AboutPage,
    BrowseTeamPage,
    DummyloaderPage,
    BrowseTeammatesPage,
    FaqPage,
    SplitPayPage,
    TermsPage,
    LanguageSettingsPage,
    ForgetPage,
    SearchPage,
    AutocompletePage,
    FullteamPage,
    //BookingHistoryPage,
    AddressViewPage,
    BookNowPage,
    CreateTeamPage,
    MyTeamPage,
    TournamentListPage,
    TournamentDetailsPage,
    JoinFriendlyPage,
    OtherTeamPage,
    EditProfilePage,
    AddPlayersPage,
    SplitPaymentPage,
    FullPaymentPage,
    JoinFriendlyMatchPage,
    BookedTournamnetDetailsPage,
    TwoTeamPage,
    StarterPage,
    StartJourneyPage,
    PayNowPage,
    PlayerDetailsPage,
    AddRatingPage,
    FiltterPage,
    AccordianComponent,
    AddTeamRatingPage,
    PaypalPage,
    AddGroundRatingPage,
    BookingGroundDetailsPage
  ],
  providers: [LocationAccuracy, Diagnostic,
    StatusBar, Stripe,
    SplashScreen, GooglePlus, Geolocation, NativeGeocoder, GoogleMaps, SocialSharing, CallNumber, Facebook, Screenshot,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar, FileTransfer,
    FileTransferObject, PhotoViewer, FilePath,
    File,
    Camera, Network,
    //PayPal,
    RestApiProvider, UniqueDeviceID,
    Firebase,
    FcmProvider,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

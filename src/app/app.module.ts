import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, Headers, HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';


import { ModalCharacter } from '../pages/home/Modal/ModalCharacter'
import { ModalIntro } from '../pages/home/Modal/ModalIntro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketService } from '../providers/socket-service/socket-service';

import { GameMain } from '../providers/GameService/GameMain';
import { SettingsService } from '../providers/OptionServices/SettingsService';
import { Auth } from '../providers/auth';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalCharacter,
    ModalIntro,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalCharacter,
    ModalIntro,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    GameMain,
    SettingsService,
    Auth,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
